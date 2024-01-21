'use client';

import Button from '@components/ui/Button';
import Icon from '@components/ui/Icon';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import { FaPowerOff } from 'react-icons/fa6';
import styles from './SignOutButton.module.scss';

const cx = classNames.bind(styles);

type Props = {
  type: 'mobile' | 'desktop';
  className?: string;
};

export default function SignOutButton({ type, className }: Props) {
  const translate = useTranslations('components.navBar');

  const title = translate(type === 'desktop' ? 'signOutBtn' : 'signOutBtn_v2');
  const size = type === 'desktop' ? 22 : 18;

  const onClickHandler = () => {};

  return (
    <Button
      fullSize
      className={cx(className)}
      variant={type === 'desktop' ? 'danger' : undefined}
      onClick={onClickHandler}
    >
      <Icon className={cx({ 'mr-[5px]': type === 'mobile' })} icon={FaPowerOff} size={size} />
      <span>{title}</span>
    </Button>
  );
}
