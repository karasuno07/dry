import Menu from '@components/elements/Menu';
import { CategoryResponse } from '@model/Categories';
import { SearchParams } from 'api';
import classNames from 'classnames/bind';
import { assign, unset } from 'lodash';
import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { FaThList } from 'react-icons/fa';
import { VideoType } from 'ui';
import GenresService from '~/service/tmdb/genres';
import styles from './FunctionBar.module.scss';

const cx = classNames.bind(styles);

type Props = {
  params: SearchParams;
};

async function getMovieGenres() {
  const { genres } = await GenresService.getMovieGenres();
  return genres.map((genre) => new CategoryResponse(genre));
}

async function getTvSeriesGenres() {
  const { genres } = await GenresService.getTvSeriesGenres();
  return genres.map((genre) => new CategoryResponse(genre));
}

async function CategorySelector({ params }: Props) {
  const translate = await getTranslations(getLocale());

  const movieGenres = await getMovieGenres();
  const tvGenres = await getTvSeriesGenres();

  const currentType = (params.type as VideoType) || 'movie';
  const current = movieGenres.find((c) => c.slug === params.category);

  const buildSearchParams = ({ type, category }: { type: VideoType; category?: string }) => {
    const newSearchParams: { [key: string]: any } = { ...params };
    assign(newSearchParams, { type });
    if (category) {
      assign(newSearchParams, { category });
    } else {
      unset(newSearchParams, 'category');
    }
    return `?${new URLSearchParams(newSearchParams)}`;
  };

  const movieItems = movieGenres.map((category) => (
    <Link
      key={category.id}
      className='block w-full h-full'
      href={buildSearchParams({ type: currentType, category: category.slug })}
    >
      {category.name}
    </Link>
  ));

  const tvItems = tvGenres.map((category) => (
    <Link
      key={category.id}
      className='block w-full h-full'
      href={buildSearchParams({ type: currentType, category: category.slug })}
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
                href={buildSearchParams({ type: 'movie' })}
              >
                {translate('videos.types.movie')}
              </Link>
              <Link
                className={cx('bypass-evt', { selected: currentType === 'tv-series' })}
                href={buildSearchParams({ type: 'tv-series' })}
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

export default CategorySelector;
