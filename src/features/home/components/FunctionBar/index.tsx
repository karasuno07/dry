import Menu from '@components/elements/Menu';
import { LayoutMode } from '@features/home/layout';
import { CategoryResponse } from '@model/Categories';
import { SearchParams } from 'api';
import classNames from 'classnames/bind';
import { assign } from 'lodash';
import Link from 'next/link';
import { BiSolidGridAlt } from 'react-icons/bi';
import { FaThList } from 'react-icons/fa';
import { HiSquare3Stack3D } from 'react-icons/hi2';
import FilterBar from './FilterBar';
import styles from './FunctionBar.module.scss';

const cx = classNames.bind(styles);

type Props = {
  categoryList: CategoryResponse[];
  params: SearchParams;
};

export default function FunctionBar({ categoryList, params }: Props) {
  const currentLayoutMode = (params.mode as string) || 'grid';
  const curentCategorySlug = (params.category as string) || null;

  const title =
    categoryList.find((c) => c.slug === curentCategorySlug)?.name ||
    'All Categories';

  const buildSearchParams = ({
    mode,
    category,
  }: {
    mode?: LayoutMode;
    category?: string;
  }) => {
    const newSearchParams: { [key: string]: any } = { ...params };
    if (mode) {
      assign(newSearchParams, { mode });
    }
    if (category) {
      assign(newSearchParams, { category });
    }

    return `?${new URLSearchParams(newSearchParams)}`;
  };

  return (
    <div className={cx('root')}>
      <div className={cx('list')}>
        <Menu
          menuType='grid'
          dropdownAnimation='pulse'
          classes={{
            menuClassName: cx('category-menu'),
            menuListClassName: 'grid-rows-4 grid-flow-col gap-y-1',
          }}
          anchor={<FaThList className={cx('selector')} size={24} />}
          items={categoryList.map((category) => (
            <Link
              key={category.id}
              className='block w-full h-full'
              href={buildSearchParams({ category: category.slug })}
            >
              {category.name}
            </Link>
          ))}
        />
        <span className={cx('title')}>{title}</span>
      </div>
      <FilterBar />
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
    </div>
  );
}
