'use client';

import Button, { ButtonProps } from '@components/elements/Button';
import Icon from '@components/elements/Icon';
import { useRouter } from '@lib/navigation';
import classNames from 'classnames/bind';
import { signIn } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

import styles from './OAuthSignIn.module.scss';

const cx = classNames.bind(styles);

type OAuthSignInProps = Omit<ButtonProps, 'fullSize' | 'onClick'> & {
  provider: {
    id: string;
    name: string;
  };
};

function OAuthSignIn({ provider, className, ...buttonProps }: OAuthSignInProps) {
  const locale = useLocale();
  const router = useRouter();
  const translate = useTranslations('features.authentication');

  let icon = undefined;
  switch (provider.id) {
    case 'github':
      icon = FaGithub;
      break;
    case 'google':
      icon = FcGoogle;
      break;
    default:
      return;
  }

  const onOAuth2AuthorizeHandler = async () => {
    const response = await signIn(
      provider.id,
      {
        callbackUrl: '/',
      },
      { prompt: 'login' }
    );
    if (response?.error) {
      router.push(`?${new URLSearchParams({ error: response.error })}`, { locale });
    }
  };

  return (
    <Button
      fullSize
      className={cx('root', provider.id, className)}
      onClick={onOAuth2AuthorizeHandler}
      {...buttonProps}
    >
      <Icon icon={icon} size={25} />
      <span className={cx('text')}>{translate('oauth', { provider: provider.name })}</span>
    </Button>
  );
}

export default OAuthSignIn;
