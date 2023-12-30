'use client';

import useCountdown from '@hooks/useCountdown';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export default function SignOutActions() {
  const translate = useTranslations('pages.auth.signOut');
  const seconds = useCountdown(3);

  if (seconds === 1) {
    signOut({ callbackUrl: '/' });
  }

  return (
    <div className='absolute-center text-center text-white'>
      <h3 className='text-xl'>{translate('alert.line1')}</h3>
      <p color='text-lg'>
        {translate('alert.line2', { seconds })}
        ...
      </p>
    </div>
  );
}
