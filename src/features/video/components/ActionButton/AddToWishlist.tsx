import Button from '@components/elements/Button';
import Icon from '@components/elements/Icon';
import classNames from 'classnames/bind';
import { getTranslations } from 'next-intl/server';
import { FaHeartCirclePlus } from 'react-icons/fa6';
import styles from './ActionButton.module.scss';

const cx = classNames.bind(styles);

type Props = {};

export default async function AddToWishlist({}: Props) {
  const translate = await getTranslations('features.video.actionButton');

  return (
    <Button className={cx('wishlist')}>
      <Icon icon={FaHeartCirclePlus} size={22} />
      <span>{translate('wishlist')}</span>
    </Button>
  );
}
