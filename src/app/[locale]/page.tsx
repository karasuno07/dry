import Pagination from '@components/Pagination';
import FunctionBar from '@features/video/components/FunctionBar';
import VideoList, { SkeletonVideoList } from '@features/video/components/VideoList';
import { VideoResponse } from '@model/Videos';
import { SearchParams as UrlSearchParams } from 'api';
import { getLocale } from 'next-intl/server';
import { Suspense } from 'react';
import { DiscoverParams, DiscoverType, SearchParams, SortParams } from 'tmdb/api';
import { LayoutMode, VideoType } from 'ui';
import { LocaleType } from '~/constants/locales';
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
  const videoType = (searchParams.type as VideoType) || 'movie';
  const searchType = videoType === 'tv-series' ? 'tv' : 'movie';
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

  return (
    <div className='w-full h-full overflow-hidden'>
      <FunctionBar params={searchParams} />
      <Suspense fallback={<SkeletonVideoList mode={layoutMode} skeletonCells={12} />}>
        <VideoList mode={layoutMode} type={videoType} videos={videos} />
      </Suspense>
      <Pagination totalPage={total_pages} itemPerPage={limit} searchParams={searchParams} />
    </div>
  );
}
