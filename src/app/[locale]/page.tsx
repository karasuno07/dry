import FunctionBar from '@features/video/components/FunctionBar';
import VideoList from '@features/video/components/VideoList/';
import { SearchParams as UrlSearchParams } from 'types/api';
import { DisplayMode, VideoType } from 'types/ui';

type Props = {
  searchParams: UrlSearchParams;
};

export default async function Index({ searchParams }: Props) {
  const display = (searchParams.display as DisplayMode) || 'grid';
  const type = (searchParams.type as VideoType) || 'movie';
  const category = (searchParams.category as string) || '';
  const page = Number(searchParams.page as string) || 1;

  return (
    <div className='w-full h-full overflow-hidden'>
      <FunctionBar searchParams={searchParams} />
      <VideoList display={display} type={type} category={category} page={page} />
    </div>
  );
}
