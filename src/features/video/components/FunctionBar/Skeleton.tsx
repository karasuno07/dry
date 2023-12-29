import classNames from 'classnames/bind';
import { SkeletonCategorySelector } from './CategorySelector';
import styles from './FunctionBar.module.scss';
import { SkeletonLayoutSelector } from './LayoutSelector';

const cx = classNames.bind(styles);

export default function Sekeleton() {
  return (
    <div className={cx('root')}>
      <SkeletonCategorySelector />
      <SkeletonLayoutSelector />
    </div>
  );
}
