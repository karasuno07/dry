import Backdrop from '@components/elements/Backdrop';
import { SkeletonFunctionBar } from '@features/video/components/FunctionBar';
import { SkeletonVideoList } from '@features/video/components/VideoList';

export default function Loading() {
  return (
    <div className='w-full h-full overflow-hidden'>
      <SkeletonFunctionBar />
      <SkeletonVideoList />
      <Backdrop className='rounded-md' loadingAnimation='wave' />
    </div>
  );
}
