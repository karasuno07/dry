import classNames from 'classnames/bind';
import { Suspense } from 'react';
import { SearchParams } from 'types/api';
import { DisplayMode } from 'types/ui';
import GenresService from '~/service/tmdb/genres';
import { CategoryResponse } from '~/service/tmdb/model/Categories';
import CategorySelector, { SkeletonCategorySelector } from './CategorySelector';
import FilterBar from './FilterBar';
import styles from './FunctionBar.module.scss';
import LayoutSelector from './LayoutSelector';

const cx = classNames.bind(styles);

async function getMovieCategories() {
  const data = await GenresService.getMovieGenres();
  return data?.genres.map((genre) => new CategoryResponse(genre));
}

async function getTvSeriesCategories() {
  const data = await GenresService.getTvSeriesGenres();
  return data?.genres.map((genre) => new CategoryResponse(genre));
}

type Props = {
  searchParams: SearchParams;
};

export default async function FunctionBar({ searchParams }: Props) {
  const movieCategories = await getMovieCategories();
  const tvCategories = await getTvSeriesCategories();

  const onChangeLayoutHandler = (display: DisplayMode) => {
    const newSearchParams = new URLSearchParams(searchParams as { [key: string]: any });
    newSearchParams.set('display', display);
    newSearchParams.delete('q');
    return '?' + newSearchParams.toString();
  };

  return (
    <div className={cx('root')}>
      <Suspense key={`category=${searchParams.category}`} fallback={<SkeletonCategorySelector />}>
        <CategorySelector
          categories={JSON.parse(
            JSON.stringify({
              movie: movieCategories,
              tv: tvCategories,
            })
          )}
        />
        <FilterBar />
      </Suspense>
      <LayoutSelector
        current={(searchParams.display as DisplayMode) || 'grid'}
        onChangeMode={onChangeLayoutHandler}
      />
    </div>
  );
}

export { default as SkeletonFunctionBar } from './Skeleton';
