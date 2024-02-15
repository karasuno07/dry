'use client';

import Form from '@components/ui/Form';
import Icon from '@components/ui/Icon';
import OAuthSignIn from '@features/authentication/components/oauth';
import { UserBriefResponse } from '@features/authentication/model/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link } from '@lib/navigation';
import classNames from 'classnames/bind';
import { ClientSafeProvider } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';
import * as yup from 'yup';
import styles from './SignIn.module.scss';
import VerifyPassword from './VerifyPassword';
import VerifyUsername from './VerifyUsername';

const cx = classNames.bind(styles);

export type FormData = {
  username: string;
  password: string;
  pwd?: string;
};

type SignInFormProps = {
  oauthProviders: ClientSafeProvider[];
};

export default function SignInForm({ oauthProviders }: SignInFormProps) {
  const messages = useTranslations('messages.validation');
  const translate = useTranslations('pages.auth');
  const [user, setUser] = useState<UserBriefResponse | null>(null);

  const defaultValues = {
    username: '',
    password: '',
    pwd: undefined,
  };

  const validationSchema = yup
    .object<FormData>()
    .shape({
      username: yup
        .string()
        .matches(/^[a-z0-9._]{6,50}$/i, messages('username.pattern'))
        .min(6, messages('username.min', { length: 6 }))
        .max(50, messages('username.max', { length: 50 }))
        .required(messages('username.required')),
      password: yup
        .string()
        .min(6, messages('password.min', { length: 6 }))
        .required(messages('password.required')),
      pwd: yup.string(),
    })
    .required();

  return (
    <Form<FormData>
      className={cx('card', 'root')}
      defaultValues={defaultValues}
      resolver={yupResolver(validationSchema)}
    >
      {({ reset }) => {
        const resetFormHandler = () => {
          reset();
          setUser(null);
        };

        return (
          <>
            {user === null && <VerifyUsername setUser={setUser} />}
            {user !== null && <VerifyPassword user={user} />}

            <div className='flex mt-[10px]'>
              {user === null && (
                <>
                  <Link className={cx('link', 'mr-auto')} href='sign-up'>
                    {translate('signIn.createAccountLink')}
                  </Link>
                  <Link className={cx('link', 'ml-auto')} href='forget-password'>
                    {translate('signIn.forgetPasswordLink')}
                  </Link>
                </>
              )}
              {!user === null && (
                <p className={cx('retry')} onClick={resetFormHandler}>
                  <Icon icon={FaRegCircleUser} size={16} />
                  <span>{translate('signIn.tryAgain')}</span>
                </p>
              )}
            </div>
            <hr className={cx('divider')} />

            {oauthProviders.map((provider) => {
              return (
                <OAuthSignIn
                  key={provider.id}
                  provider={{
                    id: provider.id,
                    name: provider.name,
                  }}
                  className={'px-[10px] py-[15px]'}
                />
              );
            })}
          </>
        );
      }}
    </Form>
  );
}
