import FunctionBar from '@features/home/components/FunctionBar';
import Grid from '@features/home/components/Grid';
import Pagination from '@features/home/components/Pagination';
import Previewer from '@features/home/components/VideoPreviewer';
import CategoryService from '@features/home/service/categories';
import { SearchParams } from 'api';
import cx from 'classnames';

export type LayoutMode = 'grid' | 'stack';

type Props = {
  fullSize?: boolean;
  searchParams: SearchParams;
};

export default async function HomeLayout({ fullSize, searchParams }: Props) {
  const layoutMode = (searchParams.mode as LayoutMode) || 'grid';
  const page = (searchParams.page as string) || '1';
  const categorySlug = (searchParams.category as string) || null;

  const categories = await CategoryService.getCategories();
  const videos = new Array(12);

  const Layout = layoutMode === 'grid' ? Grid : 'div';

  return (
    <div
      className={cx({
        ['w-full h-full']: fullSize,
      })}
    >
      <FunctionBar
        categoryList={categories}
        categoryTitle={categories.find((c) => c.slug === categorySlug)?.name}
        params={{
          layoutMode,
          page,
          categorySlug,
        }}
      />
      <Layout template='cols'>
        {videos.fill(0).map((video, idx) => (
          <Previewer key={idx} />
        ))}
      </Layout>
      <Pagination totalItems={12} itemPerPage={6} />
    </div>
  );
}
