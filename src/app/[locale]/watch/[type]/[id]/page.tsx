import Badge from '@components/elements/Badge';
import SSRImage from '@components/elements/Image/server/SSRImage';
import Rating from '@features/video/components/Rating';
import { Movie, TvSeries } from '@model/Videos';
import classNames from 'classnames/bind';
import { round } from 'lodash';
import { getTranslations } from 'next-intl/server';
import { DiscoverType } from 'tmdb/api';
import { VideoType } from 'ui';
import { LocaleType } from '~/constants/locales';
import { UTILS } from '~/service/tmdb/base';
import VideoService from '~/service/tmdb/videos';
import styles from './WatchVideo.module.scss';

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

export default async function WatchPage({ params: { locale, type, id } }: Props) {
  const translate = await getTranslations('videos');

  const details = await getVideoDetails(type === 'tv-series' ? 'tv' : 'movie', id, locale);

  const title = type === 'tv-series' ? (details as TvSeries).name : (details as Movie).title;
  const rating = round(details.vote_average / 2, 1);

  return (
    <div className={cx('root')}>
      <div className={cx('content-wrapper')}>
        <SSRImage
          className={cx('poster')}
          src={UTILS.buildImageUrl(details.poster_path)}
          alt={details.poster_path}
        />
        <div className={cx('details')}>
          <h3 className={cx('title')}>{title}</h3>
          <p className={cx('tagline')}>{details.tagline}</p>
          <div className={cx('rating')}>
            <span>{rating}</span>
            <Rating value={rating} />
          </div>
          <div className={cx('genres')}>
            <span>{translate('genres')}</span>
            {details.genres.map((genre) => (
              <Badge key={genre.id} variant='dark'>
                {genre.name}
              </Badge>
            ))}
          </div>
          <div className={cx('overview')}>
            <span>{translate('overview')}</span>
            <p>{details.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
