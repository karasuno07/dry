import { CategoryResponse } from '@model/Categories';
import { SearchParams } from 'api';
import classNames from 'classnames/bind';
import CategorySelector from './CategorySelector';
import FilterBar from './FilterBar';
import styles from './FunctionBar.module.scss';
import LayoutSelector from './LayoutSelector';

const cx = classNames.bind(styles);

type Props = {
  categories: CategoryResponse[];
  params: SearchParams;
};

export default function FunctionBar({ categories, params }: Props) {
  return (
    <div className={cx('root')}>
      <CategorySelector list={categories} params={params} />
      <FilterBar />
      <LayoutSelector params={params} />
    </div>
  );
}
