import { CategoryResponse } from '@model/Categories';
import classNames from 'classnames/bind';
import { assign } from 'lodash';
import { Suspense } from 'react';
import { SearchParams } from 'types/api';
import { DisplayMode } from 'types/ui';
import GenresService from '~/service/tmdb/genres';
import CategorySelector, { SkeletonCategorySelector } from './CategorySelector';
import FilterBar from './FilterBar';
import styles from './FunctionBar.module.scss';
import LayoutSelector from './LayoutSelector';

const cx = classNames.bind(styles);

async function getMovieCategories() {
  const { genres } = await GenresService.getMovieGenres();
  return genres.map((genre) => new CategoryResponse(genre));
}

async function getTvSeriesCategories() {
  const { genres } = await GenresService.getTvSeriesGenres();
  return genres.map((genre) => new CategoryResponse(genre));
}

type Props = {
  searchParams: SearchParams;
};

export default async function FunctionBar({ searchParams }: Props) {
  const movieCategories = await getMovieCategories();
  const tvCategories = await getTvSeriesCategories();

  const onChangeLayoutHandler = (display: DisplayMode) => {
    const newSearchParams: { [key: string]: any } = { ...searchParams };
    assign(newSearchParams, { display });
    return `?${new URLSearchParams(newSearchParams)}`;
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
      </Suspense>
      <FilterBar />
      <LayoutSelector
        current={(searchParams.display as DisplayMode) || 'grid'}
        onChangeMode={onChangeLayoutHandler}
      />
    </div>
  );
}
