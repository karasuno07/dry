import { SearchParams } from 'api';
import classNames from 'classnames/bind';
import { assign, unset } from 'lodash';
import { LayoutMode, VideoType } from 'ui';
import CategorySelector from './CategorySelector';
import FilterBar from './FilterBar';
import styles from './FunctionBar.module.scss';
import LayoutSelector from './LayoutSelector';

const cx = classNames.bind(styles);

type Props = {
  params: SearchParams;
};

export default function FunctionBar({ params }: Props) {
  const onChangeTypeHandler = (type: VideoType) => {
    const newSearchParams: { [key: string]: any } = { ...params };
    assign(newSearchParams, { type });
    unset(newSearchParams, 'category');
    unset(newSearchParams, 'page');
    return `?${new URLSearchParams(newSearchParams)}`;
  };

  const onChangeCategoryHandler = (category: string) => {
    const newSearchParams: { [key: string]: any } = { ...params };
    assign(newSearchParams, { category });
    unset(newSearchParams, 'page');
    return `?${new URLSearchParams(newSearchParams)}`;
  };

  const onChangeLayoutHandler = (mode: LayoutMode) => {
    const newSearchParams: { [key: string]: any } = { ...params };
    assign(newSearchParams, { mode });
    return `?${new URLSearchParams(newSearchParams)}`;
  };

  return (
    <div className={cx('root')}>
      <CategorySelector
        currentType={(params.type as VideoType) || 'movie'}
        currentGenre={params.category as string}
        onChangeType={onChangeTypeHandler}
        onChangeCategory={onChangeCategoryHandler}
      />
      <FilterBar />
      <LayoutSelector
        current={(params.mode as LayoutMode) || 'grid'}
        onChangeMode={onChangeLayoutHandler}
      />
    </div>
  );
}
