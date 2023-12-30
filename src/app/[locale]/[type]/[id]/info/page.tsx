import SSRImage from '@components/elements/Image/server/SSRImage';
import AddToWishlist from '@features/video/components/ActionButton/AddToWishlist';
import LinkToWatch from '@features/video/components/ActionButton/LinkToWatch';
import Credits from '@features/video/components/Credits';
import Genres from '@features/video/components/Genres';
import Metadata from '@features/video/components/Metadata';
import Rating from '@features/video/components/Rating';
import RelatedVideos from '@features/video/components/RelatedVideos';
import { Movie, TvSeries } from '@model/Videos';
import classNames from 'classnames/bind';
import { round } from 'lodash';
import { getTranslations } from 'next-intl/server';
import { LocaleType } from 'types/locale';
import { DiscoverType } from 'types/tmdb/api';
import { VideoType } from 'types/ui';
import transparentBackgroundNotFoundImage from '~/assets/images/portrait-image-not-found.png';
import { UTILS } from '~/service/tmdb/base';
import VideoService from '~/service/tmdb/videos';
import styles from './Info.module.scss';

const cx = classNames.bind(styles);

type Props = {
  params: {
    locale: LocaleType;
    type: VideoType;
    id: number;
  };
};

async function getVideoDetails(type: DiscoverType, id: number, language: LocaleType = 'en') {
  const data = await VideoService.getDetails(type, id, {
    language: language,
  });

  if (type === 'movie') {
    return data as Movie;
  } else {
    return data as TvSeries;
  }
}

export default async function VideoInfo({ params: { locale, type, id } }: Props) {
  const translate = await getTranslations('videos');
  const searchType: DiscoverType = type === 'tv-series' ? 'tv' : 'movie';
  const details = await getVideoDetails(searchType, id, locale);

  const title = type === 'tv-series' ? (details as TvSeries).name : (details as Movie).title;
  const originalTitle =
    type === 'tv-series' ? (details as TvSeries).original_name : (details as Movie).original_title;
  const rating = round(details.vote_average / 2, 1);

  return (
    <div className={cx('root')}>
      <div className={cx('content-wrapper')}>
        <div className={cx('poster')}>
          <SSRImage
            src={UTILS.buildImageUrl(details.poster_path)}
            alt={details.poster_path}
            notFoundSrc={transparentBackgroundNotFoundImage}
          />
        </div>
        <div className={cx('details')}>
          <h3 className={cx('title')}>{title}</h3>
          <p className={cx('tagline')}>{details.tagline || originalTitle}</p>
          <div className={cx('rating')}>
            <span>{rating}</span>
            <Rating value={rating} />
          </div>
          <Metadata type={type} data={details} />
          <Genres genres={details.genres} />
          <div className={cx('overview')}>
            <span>{translate('overview')}</span>
            <p>{details.overview || 'TBD'}</p>
          </div>
          <div className='mt-auto'>
            <Credits
              className='mb-[5px]'
              title={translate('casts')}
              videoType={searchType}
              videoId={id}
            />
            <div className={cx('actions')}>
              <LinkToWatch link={`/${type}/${id}/watch`} />
              <AddToWishlist />
            </div>
          </div>
        </div>
      </div>
      <RelatedVideos className={cx('related-videos')} videoType={searchType} videoId={id} />
    </div>
  );
}
