'use client';

import Icon from '@components/elements/Icon';
import classNames from 'classnames/bind';
import { useRouter } from 'next/navigation';
import { FaCirclePlay } from 'react-icons/fa6';
import styles from './Previewer.module.scss';

const cx = classNames.bind(styles);

type Props = {
  videoLink: string;
};

export default function InteractiveOverlay({ videoLink }: Props) {
  const router = useRouter();

  const onClickPlayButton = () => router.push(videoLink);

  return (
    <div className={cx('overlay')}>
      <Icon
        className={cx('absolute-center', 'play-icon')}
        icon={FaCirclePlay}
        size={48}
        onClick={onClickPlayButton}
      />
    </div>
  );
}
