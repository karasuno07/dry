import Pagination from '@components/Pagination';
import Grid from '@components/ui/Grid';
import Stack from '@components/ui/Stack';
import { CSRPreviewer as Previewer } from '@features/video/components/Previewer';
import { UTILS } from '@services/tmdb/base';
import GenresService from '@services/tmdb/genres';
import { VideoResponse } from '@services/tmdb/model/Videos';
import SearchService from '@services/tmdb/search';
import classNames from 'classnames/bind';
import { getLocale } from 'next-intl/server';
import { LocaleType } from 'types/locale';
import { DiscoverParams, DiscoverType, SearchParams, SortParams } from 'types/tmdb/api';
import { DisplayMode } from 'types/ui';
import NotFound from './NotFound';
import styles from './VideoList.module.scss';

const cx = classNames.bind(styles);
const limit = 20; // the fixed number tmdb api supports

type ComponentProps = {
  query: string;
  display: DisplayMode;
  type: DiscoverType;
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
  return {
    ...response,
    results: response?.results.map((data) => new VideoResponse(data)),
  };
}

export default async function VideoList({ query, display, type, category, page }: ComponentProps) {
  const Layout = display === 'grid' ? Grid : Stack;
  const currentGenre = await GenresService.getGenreBySlug(type, category);
  const language = (await getLocale()) as LocaleType;

  const { results: videos, total_pages } = await searchVideos(type, {
    query,
    page,
    language,
    include_adult: false,
    with_genres: currentGenre ? currentGenre.id.toString() : undefined,
  });

  return (
    <section>
      {videos && videos?.length > 0 && (
        <>
          <Layout className={cx('root')} template='cols'>
            {videos.map((video) => (
              <Previewer
                render='client'
                key={video.id}
                id={video.id}
                title={video.title}
                overview={video.overview}
                type={type}
                display={display === 'stack' ? 'detailed' : 'simple'}
                backdropImage={UTILS.buildImageUrl(
                  video.backdrop_path,
                  display === 'stack' ? 'original' : 'w1280'
                )}
              />
            ))}
          </Layout>
          <Pagination totalPage={total_pages} itemPerPage={limit} />
        </>
      )}
      {videos?.length === 0 && <NotFound />}
    </section>
  );
}

export { default as SkeletonVideoList } from './Skeleton';

