'use client';

import Button from '@components/ui/Button';
import Dialog from '@components/ui/Dialog';
import Icon from '@components/ui/Icon';
import classNames from 'classnames/bind';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FaPowerOff } from 'react-icons/fa6';
import styles from './SignOutButton.module.scss';

const cx = classNames.bind(styles);

type Props = {
  type: 'mobile' | 'desktop';
  className?: string;
};

export default function SignOutButton({ type, className }: Props) {
  const translate = useTranslations('components.navBar');
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const title = translate(type === 'desktop' ? 'signOutBtn' : 'signOutBtn_v2');
  const size = type === 'desktop' ? 22 : 18;

  const onClickHandler = () => setShowConfirmModal(true);
  const onCloseHandler = () => setShowConfirmModal(false);
  const onClickConfirmSignOutHandler = () => signOut({ callbackUrl: '/' });

  return (
    <>
      <Button
        fullSize
        className={className}
        variant={type === 'desktop' ? 'danger' : undefined}
        onClick={onClickHandler}
      >
        <Icon className={cx({ 'mr-[5px]': type === 'mobile' })} icon={FaPowerOff} size={size} />
        <span>{title}</span>
      </Button>

      <Dialog
        open={showConfirmModal}
        className={cx('sign-out-popup')}
        severity='error'
        title={translate('signOutDialog.title')}
        content={translate('signOutDialog.message')}
        actions={
          <>
            <Button className={cx('action-btn', 'close')} paddingLess onClick={onCloseHandler}>
              {translate('signOutDialog.cancel')}
            </Button>
            <Button
              className={cx('action-btn', 'ok')}
              paddingLess
              onClick={onClickConfirmSignOutHandler}
            >
              {translate('signOutDialog.ok')}
            </Button>
          </>
        }
      />
    </>
  );
}
