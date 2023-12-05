'use client';

import Icon from '@components/elements/Icon';
import classNames from 'classnames/bind';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FaCirclePlay, FaHeart, FaRegHeart } from 'react-icons/fa6';
import styles from './Previewer.module.scss';

const cx = classNames.bind(styles);

type Props = {
  inWishList?: boolean;
  videoLink: string;
};

export default function InteractiveOverlay({ inWishList, videoLink }: Props) {
  const locale = useLocale();
  const router = useRouter();

  const onClickPlayButton = () => router.push(videoLink, { locale });
  const onClickWishListButton = () => {};

  return (
    <div className={cx('overlay')} onDoubleClick={(evt) => evt.preventDefault()}>
      <Icon
        className={cx('absolute-center', 'play-icon')}
        icon={FaCirclePlay}
        size={48}
        onClick={onClickPlayButton}
      />
      <Icon
        className={cx('wishlist-icon')}
        icon={inWishList ? FaHeart : FaRegHeart}
        size={24}
        onClick={onClickWishListButton}
      />
    </div>
  );
}
