import Pagination from '@components/Pagination';
import Grid from '@components/elements/Grid';
import FunctionBar from '@features/video/components/FunctionBar';
import Previewer from '@features/video/components/Previewer';
import { VideoResponse } from '@model/Videos';
import { SearchParams as UrlSearchParams } from 'api';
import { getLocale } from 'next-intl/server';
import { DiscoverType, SearchParams, SortParams } from 'tmdb/api';
import { LayoutMode, VideoType } from 'ui';
import { LocaleType } from '~/constants/locales';
import SearchService from '~/service/tmdb/search';

type Props = {
  searchParams: UrlSearchParams;
};

async function getVideos(discover: boolean, type: DiscoverType, params: SearchParams & SortParams) {
  if (discover) {
    return await SearchService.discover(type, params);
  } else {
    return await SearchService.search(type, params);
  }
}

export default async function Index({ searchParams }: Props) {
  const layoutMode = (searchParams.mode as LayoutMode) || 'grid';
  const searchType = (searchParams.type as VideoType) === 'tv-series' ? 'tv' : 'movie';
  const language = (await getLocale()) as LocaleType;
  const page = Number(searchParams.page as string) || 1;
  const limit = 20; // the fixed number tmdb api supports

  const { results, total_pages } = await getVideos(true, searchType, {
    page,
    language,
    include_adult: true,
  });
  const videos = results.map((data) => new VideoResponse(data));

  const Layout = layoutMode === 'grid' ? Grid : 'div';

  return (
    <div className='w-full h-full'>
      <FunctionBar params={searchParams} />
      <Layout template='cols'>
        {videos.map((video, idx) => (
          <Previewer key={idx} backdropImage={video.backdrop_url} />
        ))}
      </Layout>
      <Pagination totalPage={total_pages} currentPage={page} itemPerPage={limit} />
    </div>
  );
}
