'use client';

import AddToWishlist from '@features/video/components/ActionButton/AddToWishlist';
import LinkToWatch from '@features/video/components/ActionButton/LinkToWatch';
import Credits from '@features/video/components/Credits';
import Genres from '@features/video/components/Genres';
import Metadata from '@features/video/components/Metadata';
import Rating from '@features/video/components/Rating';
import { useIsMobile } from '@hooks/useMediaQuery';
import { Movie, TvSeries, VideoDetails } from '@services/tmdb/model/Videos';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import { DiscoverType } from 'types/tmdb/api';
import styles from './Info.module.scss';

const cx = classNames.bind(styles);

type Props = {
  id: number;
  type: DiscoverType;
  details: VideoDetails;
};

export default function Details({ id, type, details }: Props) {
  const translate = useTranslations('videos');
  const isMobile = useIsMobile();

  const title = type === 'tv' ? (details as TvSeries).name : (details as Movie).title;
  const originalTitle =
    type === 'tv' ? (details as TvSeries).original_name : (details as Movie).original_title;
  const rating = Number((details.vote_average / 2).toFixed(1));

  const mobileView = (
    <>
      <div className={cx('actions')}>
        <LinkToWatch link={`/${type}/${id}/watch`} />
        <AddToWishlist />
      </div>
      <Metadata type={type} data={details} />
      <Genres genres={details.genres} />
      <div className={cx('overview')}>
        <span>{translate('overview')}</span>
        <p title={details.overview}>{details.overview || 'TBD'}</p>
      </div>
      <Credits className='mb-[5px]' title={translate('casts')} videoType={type} videoId={id} />
    </>
  );

  const desktopView = (
    <>
      <Metadata type={type} data={details} />
      <Genres genres={details.genres} />
      <div className={cx('overview')}>
        <span>{translate('overview')}</span>
        <p title={details.overview}>{details.overview || 'TBD'}</p>
      </div>
      <div className='mt-auto'>
        <Credits className='mb-[5px]' title={translate('casts')} videoType={type} videoId={id} />
        <div className={cx('actions')}>
          <LinkToWatch link={`/${type}/${id}/watch`} />
          <AddToWishlist />
        </div>
      </div>
    </>
  );

  return (
    <div className={cx('details')}>
      <h3 className={cx('title')}>{title}</h3>
      <p className={cx('tagline')}>{details.tagline || originalTitle}</p>
      <div className={cx('rating')}>
        <span>{rating}</span>
        <Rating value={rating} />
      </div>
      {isMobile && mobileView}
      {!isMobile && desktopView}
    </div>
  );
}
