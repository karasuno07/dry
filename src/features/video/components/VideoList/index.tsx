import Grid from '@components/elements/Grid';
import Previewer, { SkeletonPreviewer } from '@features/video/components/Previewer';
import { VideoResponse } from '@model/Videos';
import classNames from 'classnames/bind';
import { LayoutMode, VideoType } from 'ui';
import { UTILS } from '~/service/tmdb/base';
import styles from './VideoList.module.scss';

const cx = classNames.bind(styles);

type ComponentProps = {
  mode: LayoutMode;
  type: VideoType;
  videos: VideoResponse[];
};

export default function VideoList({ mode, type, videos }: ComponentProps) {
  const Layout = mode === 'grid' ? Grid : 'div';

  return (
    <Layout className={cx('root')} template='cols'>
      {videos.map((video) => (
        <Previewer
          key={video.id}
          id={video.id}
          title={video.title}
          type={type}
          backdropImage={UTILS.buildImageUrl(video.backdrop_path, 'w500')}
        />
      ))}
    </Layout>
  );
}

type SkeletonProps = {
  mode: LayoutMode;
  skeletonCells: number;
};

export function SkeletonVideoList({ mode, skeletonCells }: SkeletonProps) {
  const Layout = mode === 'grid' ? Grid : 'div';

  return (
    <Layout template='cols'>
      {new Array(skeletonCells).fill(0).map((_, idx) => (
        <SkeletonPreviewer key={idx} />
      ))}
    </Layout>
  );
}
