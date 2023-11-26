import { SearchParams } from 'api';
import classNames from 'classnames/bind';
import CategorySelector from './CategorySelector';
import FilterBar from './FilterBar';
import styles from './FunctionBar.module.scss';
import LayoutSelector from './LayoutSelector';

const cx = classNames.bind(styles);

type Props = {
  params: SearchParams;
};

export default function FunctionBar({ params }: Props) {
  return (
    <div className={cx('root')}>
      <CategorySelector params={params} />
      <FilterBar />
      <LayoutSelector params={params} />
    </div>
  );
}
