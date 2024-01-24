'use client';

import Menu from '@components/ui/Menu';
import { Link } from '@lib/navigation';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { FaThList } from 'react-icons/fa';
import { DiscoverType } from 'types/tmdb/api';
import { CategoryResponse } from '~/service/tmdb/model/Categories';
import styles from './CategorySelector.module.scss';

const cx = classNames.bind(styles);

type Props = {
  categories: {
    movie: CategoryResponse[];
    tv: CategoryResponse[];
  };
};

export default function CategorySelector({ categories }: Props) {
  const translate = useTranslations('videos');
  const searchParams = useSearchParams();

  const currentType = (searchParams.get('type') as DiscoverType) || 'movie';
  const currentCategory = searchParams.get('category') || '';

  const current = categories[currentType].find((c) => c.slug === currentCategory);

  const onChangeTypeHandler = (type: DiscoverType) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('type', type);
    newSearchParams.delete('category');
    newSearchParams.delete('page');
    newSearchParams.delete('q');
    return '?' + newSearchParams.toString();
  };

  const onChangeCategoryHandler = (category: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('category', category);
    newSearchParams.delete('page');
    newSearchParams.delete('q');
    return '?' + newSearchParams.toString();
  };

  const movieItems = categories.movie.map((category) => (
    <Link
      key={category.id}
      className={cx('block w-full', { active: searchParams.get('category') === category.slug })}
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

  const currentGenreTitle =
    translate(`types.${currentType === 'movie' ? 'movie' : 'tv'}`) +
    ': ' +
    (current?.name || translate('category.default'));

  return (
    <div className={cx('root')}>
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
                {translate('types.movie')}
              </Link>
              <Link
                className={cx('bypass-evt', { selected: currentType === 'tv' })}
                href={onChangeTypeHandler('tv')}
              >
                {translate('types.tv')}
              </Link>
            </ul>
            <div className={cx('list')}>{currentType === 'movie' ? movieItems : tvItems}</div>
          </div>
        }
      />
      <span className={cx('title')}>{currentGenreTitle}</span>
    </div>
  );
}
