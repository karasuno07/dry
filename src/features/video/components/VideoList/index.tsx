import Pagination from '@components/Pagination';
import Grid from '@components/elements/Grid';
import { CSRPreviewer as Previewer } from '@features/video/components/Previewer';
import { VideoResponse } from '@model/Videos';
import classNames from 'classnames/bind';
import { getLocale } from 'next-intl/server';
import { DiscoverParams, DiscoverType, SearchParams, SortParams } from 'types/tmdb/api';
import { DisplayMode, VideoType } from 'types/ui';
import { LocaleType } from '~/constants/locales';
import { UTILS } from '~/service/tmdb/base';
import GenresService from '~/service/tmdb/genres';
import SearchService from '~/service/tmdb/search';
import styles from './VideoList.module.scss';

const cx = classNames.bind(styles);
const limit = 20; // the fixed number tmdb api supports

type ComponentProps = {
  query: string;
  display: DisplayMode;
  type: VideoType;
  category: string;
  page: number;
};

async function searchVideos(
  type: DiscoverType,
  params: SearchParams & SortParams & DiscoverParams
) {
  let response;
  if (params.query) {
    response = await SearchService.search(type, params);
  } else {
    response = await SearchService.discover(type, params);
  }
  return { ...response, results: response.results.map((data) => new VideoResponse(data)) };
}

export default async function VideoList({ query, display, type, category, page }: ComponentProps) {
  const Layout = display === 'grid' ? Grid : 'div';
  const searchType = type === 'tv-series' ? 'tv' : 'movie';
  const currentGenre = await GenresService.getGenreBySlug(searchType, category);
  const language = (await getLocale()) as LocaleType;

  const { results: videos, total_pages } = await searchVideos(searchType, {
    query,
    page,
    language,
    include_adult: false,
    with_genres: currentGenre ? currentGenre.id.toString() : undefined,
  });

  return (
    <section>
      <Layout className={cx('root')} template='cols'>
        {videos.map((video) => (
          <Previewer
            render='client'
            key={video.id}
            id={video.id}
            title={video.title}
            type={type}
            backdropImage={UTILS.buildImageUrl(video.backdrop_path, 'w500')}
          />
        ))}
      </Layout>
      <Pagination totalPage={total_pages} itemPerPage={limit} />
    </section>
  );
}
