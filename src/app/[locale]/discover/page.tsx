import FunctionBar from '@features/video/components/FunctionBar';
import VideoList from '@features/video/components/VideoList/';
import { unstable_setRequestLocale } from 'next-intl/server';
import { SearchParams as UrlSearchParams } from 'types/api';
import { DiscoverType } from 'types/tmdb/api';
import { DisplayMode } from 'types/ui';

type Props = {
  searchParams: UrlSearchParams;
  params: { locale: string };
};

export default function Index({ searchParams, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const searchQuery = (searchParams.q as string) || '';
  const display = (searchParams.display as DisplayMode) || 'grid';
  const type = (searchParams.type as DiscoverType) || 'movie';
  const category = (searchParams.category as string) || '';
  const page = Number(searchParams.page as string) || 1;

  return (
    <div className='w-full h-full overflow-hidden'>
      <FunctionBar searchParams={searchParams} />
      <VideoList
        query={searchQuery}
        display={display}
        type={type}
        category={category}
        page={page}
      />
    </div>
  );
}
