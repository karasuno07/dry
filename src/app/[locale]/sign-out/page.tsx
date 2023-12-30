import { getCurrentUser } from '@features/authentication/lib/session';
import { redirect } from '@lib/navigation';
import SignOutNotification from './SignOutNotification';

type Props = {
  params: {
    locale: string;
  };
};

export default async function SignOut({ params: { locale } }: Props) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/');
  }

  return (
    <div className='w-screen h-screen relative'>
      <SignOutNotification />
    </div>
  );
}

export const dynamic = 'force-dynamic';
