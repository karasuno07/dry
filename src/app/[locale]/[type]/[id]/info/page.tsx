import SSRImage from '@components/ui/Image/server/SSRImage';
import RelatedVideos from '@features/video/components/RelatedVideos';
import VideoService from '@features/video/service';
import { UTILS } from '@services/tmdb/base';
import classNames from 'classnames/bind';
import { LocaleType } from 'types/locale';
import { DiscoverType } from 'types/tmdb/api';
import transparentBackgroundNotFoundImage from '~/assets/images/portrait-image-not-found.png';
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

export default async function VideoInfo({ params: { locale, type, id } }: Props) {
  const details = await VideoService.getDetails(type, id, locale);

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
