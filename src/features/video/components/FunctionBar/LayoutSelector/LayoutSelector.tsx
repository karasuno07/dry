import { Link } from '@lib/navigation';
import classNames from 'classnames/bind';
import { BiSolidGridAlt } from 'react-icons/bi';
import { HiSquare3Stack3D } from 'react-icons/hi2';
import { DisplayMode } from 'types/ui';
import { Url } from 'url';
import styles from './LayoutSelector.module.scss';

const cx = classNames.bind(styles);

type Props = {
  current: DisplayMode;
  onChangeMode: (mode: DisplayMode) => Url | string;
};

export default function LayoutSelector({ current, onChangeMode }: Props) {
  return (
    <div className={cx('root')}>
      <Link
        className={cx('display-selector', {
          active: current === 'stack',
        })}
        href={onChangeMode('stack')}
      >
        <HiSquare3Stack3D size={28} />
      </Link>
      <Link
        className={cx('display-selector', {
          active: current === 'grid',
        })}
        href={onChangeMode('grid')}
      >
        <BiSolidGridAlt size={32} />
      </Link>
    </div>
  );
}
