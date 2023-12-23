import { SSRPreviewer as Previewer } from '@features/video/components/Previewer';
import useFetchRelatedVideos from '@features/video/hooks/useFetchRelatedVideos';
import classNames from 'classnames/bind';
import { DiscoverType } from 'types/tmdb/api';
import { UTILS } from '~/service/tmdb/base';
import styles from './RelatedVideos.module.scss';

const cx = classNames.bind(styles);

type Props = {
  className?: string;
  videoType: DiscoverType;
  videoId: number;
};

export default function RelatedVideos({ className, videoType, videoId }: Props) {
  const videos = useFetchRelatedVideos({ type: videoType, id: videoId });

  return (
    <div className={cx('root', className)}>
      <p className={cx('title')}>Watch Other {videoType === 'movie' ? 'Movies' : 'TV-series'}</p>
      <div className={cx('list')}>
        {videos.map((video) => (
          <Previewer
            render='server'
            key={video.id}
            id={video.id}
            title={video.title}
            type={videoType === 'tv' ? 'tv-series' : videoType}
            backdropImage={UTILS.buildImageUrl(video.backdrop_path || video.poster_path, 'w500')}
            className={cx('video')}
            size='sm'
          />
        ))}
      </div>
    </div>
  );
}
