import Button from '@components/elements/Button';
import Icon from '@components/elements/Icon';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import { FaPlay } from 'react-icons/fa6';
import styles from './ActionButton.module.scss';

const cx = classNames.bind(styles);

type Props = {
  link: string;
};

export default function LinkToWatch({ link }: Props) {
  const translate = useTranslations('features.video.actionButton');

  return (
    <Button link={{ href: link }} className={cx('play')}>
      <Icon icon={FaPlay} size={22} />
      <span>{translate('play')}</span>
    </Button>
  );
}
