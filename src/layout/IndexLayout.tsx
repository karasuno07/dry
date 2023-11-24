import Pagination from '@components/Pagination';
import Grid from '@components/elements/Grid';
import FunctionBar from '@features/video/components/FunctionBar';
import Previewer from '@features/video/components/VideoPreviewer';
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

export default async function IndexLayout({ fullSize, searchParams }: Props) {
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
