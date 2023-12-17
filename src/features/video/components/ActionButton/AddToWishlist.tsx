import Button from '@components/elements/Button';
import Icon from '@components/elements/Icon';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import { FaHeartCirclePlus } from 'react-icons/fa6';
import styles from './ActionButton.module.scss';

const cx = classNames.bind(styles);

type Props = {};

export default function AddToWishlist({}: Props) {
  const translate = useTranslations('features.video.actionButton');

  return (
    <Button className={cx('wishlist')}>
      <Icon icon={FaHeartCirclePlus} size={22} />
      <span>{translate('wishlist')}</span>
    </Button>
  );
}
