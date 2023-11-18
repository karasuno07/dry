import FunctionBar from '@features/home/components/FunctionBar';
import Grid from '@features/home/components/Grid';
import Pagination from '@features/home/components/Pagination';
import Previewer from '@features/home/components/VideoPreviewer';
import { CategoryResponse } from '@model/Categories';
import { SearchParams } from 'api';
import cx from 'classnames';
import GenresService from '~/service/tmdb/genres';

export type LayoutMode = 'grid' | 'stack';

type Props = {
  fullSize?: boolean;
  searchParams: SearchParams;
};

async function getCategories() {
  const { genres } = await GenresService.getList();
  return genres.map((genre) => new CategoryResponse(genre));
}

export default async function HomeLayout({ fullSize, searchParams }: Props) {
  const layoutMode = (searchParams.mode as LayoutMode) || 'grid';

  const categories = await getCategories();

  const videos = new Array(12);

  const Layout = layoutMode === 'grid' ? Grid : 'div';

  return (
    <div
      className={cx({
        ['w-full h-full']: fullSize,
      })}
    >
      <FunctionBar categoryList={categories} params={searchParams} />
      <Layout template='cols'>
        {videos.fill(0).map((video, idx) => (
          <Previewer key={idx} />
        ))}
      </Layout>
      <Pagination totalItems={121} params={searchParams} />
    </div>
  );
}
