import Pagination from '@components/Pagination';
import Grid from '@components/elements/Grid';
import FunctionBar from '@features/video/components/FunctionBar';
import Previewer from '@features/video/components/Previewer';
import { SearchParams } from 'api';
import { LayoutMode } from 'ui';

type Props = {
  searchParams: SearchParams;
};

export default async function Index({ searchParams }: Props) {
  const layoutMode = (searchParams.mode as LayoutMode) || 'grid';

  const videos = new Array(12);

  const Layout = layoutMode === 'grid' ? Grid : 'div';

  return (
    <div className='w-full h-full'>
      <FunctionBar params={searchParams} />
      <Layout template='cols'>
        {videos.fill(0).map((video, idx) => (
          <Previewer key={idx} />
        ))}
      </Layout>
      <Pagination totalItems={121} params={searchParams} />
    </div>
  );
}
