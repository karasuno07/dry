import AuthLayout from '@features/authentication/layout';
import { getCurrentUser } from '@features/authentication/lib/session';
import { redirect } from '@lib/navigation';
import { getProviders } from 'next-auth/react';
import SignInForm from './SignInForm';

type Props = {
  params: {
    locale: string;
  };
};

export default async function SignIn({ params: { locale = 'en' } }: Props) {
  const user = await getCurrentUser();
  const providers = await getProviders();

  const oauthProviders = Object.entries(providers || {})
    .map(([_, provider]) => provider)
    .filter((provider) => provider.type === 'oauth');

  if (user) {
    redirect('/');
  }

  return (
    <AuthLayout>
      <SignInForm oauthProviders={oauthProviders} />
    </AuthLayout>
  );
}

export const dynamic = 'force-dynamic';
