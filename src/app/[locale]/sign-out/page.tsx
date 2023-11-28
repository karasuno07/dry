'use client';

import useSession from '@features/authentication/hooks/useSession';
import useCountdown from '@hooks/useCountdown';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';

type Props = {
  params: {
    locale: string;
  };
};

function SignOut({ params: { locale } }: Props) {
  const session = useSession();
  const translate = useTranslations('pages.auth.signOut');
  const seconds = useCountdown();

  if (session && !session.user) {
    redirect('/');
  } else if (seconds === 0) {
    signOut({ callbackUrl: '/' });
  }

  return (
    <div className='w-screen h-screen relative'>
      <div className='absolute-center text-center text-white'>
        <h3 className='text-xl'>{translate('alert.line1')}</h3>
        <p color='text-lg'>
          {translate('alert.line2', { seconds })}
          {seconds > 1 ? 's' : ''}
          ...
        </p>
      </div>
    </div>
  );
}

export default SignOut;
