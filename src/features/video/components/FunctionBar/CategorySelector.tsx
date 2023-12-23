'use client';

import Menu from '@components/elements/Menu';
import { CategoryResponse } from '@model/Categories';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FaThList } from 'react-icons/fa';
import { VideoType } from 'types/ui';
import styles from './FunctionBar.module.scss';

const cx = classNames.bind(styles);

type Props = {
  categories: {
    movie: CategoryResponse[];
    tv: CategoryResponse[];
  };
};

export default function CategorySelector({ categories }: Props) {
  const translate = useTranslations();
  const searchParams = useSearchParams();

  const currentType = (searchParams.get('type') as VideoType) || 'movie';
  const currentCategory = searchParams.get('category') || '';

  const current = categories[currentType === 'tv-series' ? 'tv' : 'movie'].find(
    (c) => c.slug === currentCategory
  );

  const onChangeTypeHandler = (type: VideoType) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('type', type);
    newSearchParams.delete('category');
    newSearchParams.delete('page');
    return '?' + newSearchParams.toString();
  };

  const onChangeCategoryHandler = (category: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('category', category);
    newSearchParams.delete('page');
    return '?' + newSearchParams.toString();
  };

  const movieItems = categories.movie.map((category) => (
    <Link
      key={category.id}
      className='block w-full h-full'
      href={onChangeCategoryHandler(category.slug)}
    >
      {category.name}
    </Link>
  ));

  const tvItems = categories.tv.map((category) => (
    <Link
      key={category.id}
      className='block w-full h-full'
      href={onChangeCategoryHandler(category.slug)}
    >
      {category.name}
    </Link>
  ));

  return (
    <div className={cx('category-list-container')}>
      <Menu
        menuType='free'
        dropdownAnimation='pulse'
        classes={{
          menuListClassName: cx('category-menu'),
        }}
        anchor={<FaThList className={cx('select-icon')} size={24} />}
        items={
          <div className={cx('selector-container')}>
            <ul className={cx('selector')}>
              <Link
                className={cx('bypass-evt', { selected: currentType === 'movie' })}
                href={onChangeTypeHandler('movie')}
              >
                {translate('videos.types.movie')}
              </Link>
              <Link
                className={cx('bypass-evt', { selected: currentType === 'tv-series' })}
                href={onChangeTypeHandler('tv-series')}
              >
                {translate('videos.types.tv-series')}
              </Link>
            </ul>
            <div className={cx('list')}>{currentType === 'movie' ? movieItems : tvItems}</div>
          </div>
        }
      />
      <span className={cx('title')}>{current?.name || translate('general.category.default')}</span>
    </div>
  );
}

export async function SkeletonCategorySelector() {
  const translate = await getTranslations();

  return (
    <div className={cx('category-list-container')}>
      <Menu
        menuType='free'
        dropdownAnimation='pulse'
        classes={{
          menuListClassName: cx('category-menu'),
        }}
        anchor={<FaThList className={cx('select-icon')} size={24} />}
        items={[]}
      />
      <span className={cx('title')}>{translate('general.category.default')}</span>
    </div>
  );
}
