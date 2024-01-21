import Button from '@components/ui/Button';
import Icon from '@components/ui/Icon';
import classNames from 'classnames/bind';
import { getTranslations } from 'next-intl/server';
import { FaPlay } from 'react-icons/fa6';
import styles from './ActionButton.module.scss';

const cx = classNames.bind(styles);

type Props = {
  link: string;
};

export default async function LinkToWatch({ link }: Props) {
  const translate = await getTranslations('features.video.actionButton');

  return (
    <Button link={{ href: link }} className={cx('play')}>
      <Icon icon={FaPlay} size={22} />
      <span>{translate('play')}</span>
    </Button>
  );
}
