import Pagination from '@components/Pagination';
import Grid from '@components/elements/Grid';
import Previewer, { SkeletonPreviewer } from '@features/video/components/Previewer';
import { VideoResponse } from '@model/Videos';
import { SearchParams as UrlSearchParams } from 'api';
import classNames from 'classnames/bind';
import { getLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { DiscoverParams, DiscoverType, SearchParams, SortParams } from 'tmdb/api';
import { DisplayMode, VideoType } from 'ui';
import { LocaleType } from '~/constants/locales';
import { UTILS } from '~/service/tmdb/base';
import GenresService from '~/service/tmdb/genres';
import SearchService from '~/service/tmdb/search';
import styles from './VideoList.module.scss';

const cx = classNames.bind(styles);
const limit = 20; // the fixed number tmdb api supports

type ComponentProps = {
  searchParams: UrlSearchParams;
};

async function searchVideos(
  type: DiscoverType,
  params: SearchParams & SortParams & DiscoverParams
) {
  const response = await SearchService.discover(type, params);
  return { ...response, results: response.results.map((data) => new VideoResponse(data)) };
}

export default async function VideoList({ searchParams }: ComponentProps) {
  const display = (searchParams.display as DisplayMode) || 'grid';
  const type = (searchParams.type as VideoType) || 'movie';
  const category = (searchParams.category as string) || '';
  const page = Number(searchParams.page as string) || 1;

  const Layout = display === 'grid' ? Grid : 'div';
  const searchType = type === 'tv-series' ? 'tv' : 'movie';
  const currentGenre = await GenresService.getGenreBySlug(searchType, category);
  const language = (await getLocale()) as LocaleType;

  const { results: videos, total_pages } = await searchVideos(searchType, {
    page,
    language,
    include_adult: true,
    with_genres: currentGenre ? currentGenre.id.toString() : undefined,
  });

  return (
    <section>
      <Layout className={cx('root')} template='cols'>
        <Suspense
          fallback={new Array(12).fill(0).map((_, idx) => (
            <SkeletonPreviewer key={idx} />
          ))}
        >
          {videos.map((video) => (
            <Previewer
              key={video.id}
              id={video.id}
              title={video.title}
              type={type}
              backdropImage={UTILS.buildImageUrl(video.backdrop_path, 'w500')}
            />
          ))}
        </Suspense>
      </Layout>
      <Pagination totalPage={total_pages} itemPerPage={limit} searchParams={searchParams} />
    </section>
  );
}
