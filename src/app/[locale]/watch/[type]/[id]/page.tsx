import classNames from 'classnames/bind';
import Image from 'next/image';
import { VideoType } from 'ui';
import styles from './WatchVideo.module.scss';

const cx = classNames.bind(styles);

type Props = {
  params: {
    type: VideoType;
    id: number;
  };
};

export default function WatchPage({ params: { type, id } }: Props) {
  return (
    <div className='w-full h-full overflow-hidden'>
      <div className={cx('content-wrapper')}>
        <Image src={''} alt='' />
      </div>
    </div>
  );
}
