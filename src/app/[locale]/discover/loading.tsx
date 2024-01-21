import Loading from '@components/ui/Loading';
import { SkeletonFunctionBar } from '@features/video/components/FunctionBar';
import { SkeletonVideoList } from '@features/video/components/VideoList';

export default function LoadingPage() {
  return (
    <div className='w-full h-full overflow-hidden'>
      <SkeletonFunctionBar />
      <SkeletonVideoList />
      <Loading className='rounded-md' loadingAnimation='wave' />
    </div>
  );
}
