import { LayoutMode } from '@features/home/layout';
import { CategoryResponse } from '@features/home/model/Categories';
import classNames from 'classnames/bind';
import { isNumber } from 'lodash';
import Link from 'next/link';
import { BiSolidGridAlt } from 'react-icons/bi';
import { FaThList } from 'react-icons/fa';
import { HiSquare3Stack3D } from 'react-icons/hi2';

import Menu from '@components/elements/Menu';
import styles from './FunctionBar.module.scss';

const cx = classNames.bind(styles);

type Props = {
  categoryList: CategoryResponse[];
  categoryTitle?: string;
  params: {
    layoutMode: LayoutMode;
    page: string;
    categorySlug: string | null;
  };
};

export default function FunctionBar({
  categoryList,
  categoryTitle = 'All Categories',
  params: { layoutMode, page, categorySlug },
}: Props) {
  const buildSearchParams = ({
    nextLayoutMode,
    nextCategorySlug,
  }: {
    nextLayoutMode?: LayoutMode;
    nextCategorySlug?: string;
  }) => {
    const newSearchParams: { [key: string]: any } = {
      mode: nextLayoutMode || layoutMode,
    };
    if (nextCategorySlug || categorySlug) {
      newSearchParams.category = nextCategorySlug || categorySlug;
    }
    if (isNumber(page)) {
      newSearchParams.page = page;
    }

    return `?${new URLSearchParams(newSearchParams)}`;
  };

  return (
    <div className={cx('root')}>
      <div className={cx('list')}>
        <Menu
          menuType='grid'
          classes={{
            menuClassName: cx('category-menu'),
            menuListClassName: 'grid-rows-4 grid-flow-col gap-y-1',
          }}
          anchor={<FaThList className={cx('selector')} size={24} />}
          items={categoryList.map((category) => (
            <Link
              key={category.id}
              className='block w-full h-full'
              href={buildSearchParams({ nextCategorySlug: category.slug })}
            >
              {category.name}
            </Link>
          ))}
        />
        <span className={cx('title')}>{categoryTitle}</span>
      </div>
      <div className={cx('modes')}>
        <Link
          className={cx('mode-selector', { active: layoutMode === 'stack' })}
          href={buildSearchParams({ nextLayoutMode: 'stack' })}
        >
          <HiSquare3Stack3D size={28} />
        </Link>
        <Link
          className={cx('mode-selector', { active: layoutMode === 'grid' })}
          href={buildSearchParams({ nextLayoutMode: 'grid' })}
        >
          <BiSolidGridAlt size={32} />
        </Link>
      </div>
    </div>
  );
}
