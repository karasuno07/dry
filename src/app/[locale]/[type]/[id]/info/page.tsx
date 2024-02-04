import SSRImage from '@components/ui/Image/server/SSRImage';
import RelatedVideos from '@features/video/components/RelatedVideos';
import classNames from 'classnames/bind';
import { LocaleType } from 'types/locale';
import { DiscoverType } from 'types/tmdb/api';
import transparentBackgroundNotFoundImage from '~/assets/images/portrait-image-not-found.png';
import { UTILS } from '~/service/tmdb/base';
import { Movie, TvSeries } from '~/service/tmdb/model/Videos';
import VideoService from '~/service/tmdb/videos';
import Details from './Details';
import styles from './Info.module.scss';

const cx = classNames.bind(styles);

type Props = {
  params: {
    locale: LocaleType;
    type: DiscoverType;
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
  const details = await getVideoDetails(type, id, locale);

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
        <Details id={id} type={type} details={details} />
      </div>
      <RelatedVideos className={cx('related-videos')} videoType={type} videoId={id} />
    </div>
  );
}
