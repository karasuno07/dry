import Button from '@components/elements/Button';
import classNames from 'classnames/bind';
import { BiSolidGridAlt } from 'react-icons/bi';
import { HiSquare3Stack3D } from 'react-icons/hi2';
import styles from './LayoutSelector.module.scss';

const cx = classNames.bind(styles);

export default function SkeletonLayoutSelector() {
  return (
    <div className={cx('root')}>
      <Button className={cx('display-selector')} paddingLess>
        <HiSquare3Stack3D size={28} />
      </Button>
      <Button className={cx('display-selector', 'active')} paddingLess>
        <BiSolidGridAlt size={32} />
      </Button>
    </div>
  );
}
