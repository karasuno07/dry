import Pagination from '@components/Pagination';
import Grid from '@components/elements/Grid';
import FunctionBar from '@features/video/components/FunctionBar';
import Previewer from '@features/video/components/Previewer';
import { VideoResponse } from '@model/Videos';
import { SearchParams as UrlSearchParams } from 'api';
import { getLocale } from 'next-intl/server';
import { DiscoverParams, DiscoverType, SearchParams, SortParams } from 'tmdb/api';
import { LayoutMode, VideoType } from 'ui';
import { LocaleType } from '~/constants/locales';
import { UTILS } from '~/service/tmdb/base';
import GenresService from '~/service/tmdb/genres';
import SearchService from '~/service/tmdb/search';

type Props = {
  searchParams: UrlSearchParams;
};

async function searchVideos(
  type: DiscoverType,
  params: SearchParams & SortParams & DiscoverParams
) {
  const response = await SearchService.discover(type, params);
  return { ...response, results: response.results.map((data) => new VideoResponse(data)) };
}

export default async function Index({ searchParams }: Props) {
  const layoutMode = (searchParams.mode as LayoutMode) || 'grid';
  const searchType = (searchParams.type as VideoType) === 'tv-series' ? 'tv' : 'movie';
  const category = (searchParams.category as string) || '';
  const language = (await getLocale()) as LocaleType;
  const page = Number(searchParams.page as string) || 1;
  const limit = 20; // the fixed number tmdb api supports

  const currentGenre = await GenresService.getGenreBySlug(searchType, category);

  const { results: videos, total_pages } = await searchVideos(searchType, {
    page,
    language,
    include_adult: true,
    with_genres: currentGenre ? currentGenre.id.toString() : undefined,
  });

  const Layout = layoutMode === 'grid' ? Grid : 'div';

  return (
    <div className='w-full h-full'>
      <FunctionBar params={searchParams} />
      <Layout template='cols'>
        {videos.map((video, idx) => (
          <Previewer
            key={idx}
            title={video.title}
            backdropImage={UTILS.buildImageUrl(video.backdrop_path, 'w500')}
          />
        ))}
      </Layout>
      <Pagination totalPage={total_pages} itemPerPage={limit} searchParams={searchParams} />
    </div>
  );
}
