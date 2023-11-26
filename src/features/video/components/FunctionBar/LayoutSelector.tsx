import { SearchParams } from 'api';
import classNames from 'classnames/bind';
import { assign } from 'lodash';
import Link from 'next/link';
import { BiSolidGridAlt } from 'react-icons/bi';
import { HiSquare3Stack3D } from 'react-icons/hi2';
import { LayoutMode } from 'ui';
import styles from './FunctionBar.module.scss';

const cx = classNames.bind(styles);

type Props = {
  params: SearchParams;
};

function LayoutSelector({ params }: Props) {
  const currentLayoutMode = (params.mode as string) || 'grid';

  const buildSearchParams = ({ mode }: { mode: LayoutMode }) => {
    const newSearchParams: { [key: string]: any } = { ...params };
    assign(newSearchParams, { mode });
    return `?${new URLSearchParams(newSearchParams)}`;
  };

  return (
    <div className={cx('modes')}>
      <Link
        className={cx('mode-selector', {
          active: currentLayoutMode === 'stack',
        })}
        href={buildSearchParams({ mode: 'stack' })}
      >
        <HiSquare3Stack3D size={28} />
      </Link>
      <Link
        className={cx('mode-selector', {
          active: currentLayoutMode === 'grid',
        })}
        href={buildSearchParams({ mode: 'grid' })}
      >
        <BiSolidGridAlt size={32} />
      </Link>
    </div>
  );
}

export default LayoutSelector;
