import { SearchParams } from 'api';
import classNames from 'classnames/bind';
import { assign, unset } from 'lodash';
import { Suspense } from 'react';
import { DisplayMode, VideoType } from 'ui';
import CategorySelector, { CategorySelectorSkeleton } from './CategorySelector';
import FilterBar from './FilterBar';
import styles from './FunctionBar.module.scss';
import LayoutSelector from './LayoutSelector';

const cx = classNames.bind(styles);

type Props = {
  searchParams: SearchParams;
};

export default function FunctionBar({ searchParams }: Props) {
  const onChangeTypeHandler = (type: VideoType) => {
    const newSearchParams: { [key: string]: any } = { ...searchParams };
    assign(newSearchParams, { type });
    unset(newSearchParams, 'category');
    unset(newSearchParams, 'page');
    return `?${new URLSearchParams(newSearchParams)}`;
  };

  const onChangeCategoryHandler = (category: string) => {
    const newSearchParams: { [key: string]: any } = { ...searchParams };
    assign(newSearchParams, { category });
    unset(newSearchParams, 'page');
    return `?${new URLSearchParams(newSearchParams)}`;
  };

  const onChangeLayoutHandler = (display: DisplayMode) => {
    const newSearchParams: { [key: string]: any } = { ...searchParams };
    assign(newSearchParams, { display });
    return `?${new URLSearchParams(newSearchParams)}`;
  };

  return (
    <div className={cx('root')}>
      <Suspense fallback={<CategorySelectorSkeleton />}>
        <CategorySelector
          currentType={(searchParams.type as VideoType) || 'movie'}
          currentGenre={searchParams.category as string}
          onChangeType={onChangeTypeHandler}
          onChangeCategory={onChangeCategoryHandler}
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
