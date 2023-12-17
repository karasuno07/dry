import FunctionBar from '@features/video/components/FunctionBar';
import VideoList from '@features/video/components/VideoList';
import { SearchParams as UrlSearchParams } from 'api';

type Props = {
  searchParams: UrlSearchParams;
};

export default async function Index({ searchParams }: Props) {
  return (
    <div className='w-full h-full overflow-hidden'>
      <FunctionBar searchParams={searchParams} />
      <VideoList searchParams={searchParams} />
    </div>
  );
}
