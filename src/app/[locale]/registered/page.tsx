import AuthLayout from '@features/authentication/layout';
import UserService from '@features/authentication/services/user';
import { RedirectType } from 'next/dist/client/components/redirect';
import { redirect } from 'next/navigation';
import { SearchParams } from 'types/api';

type Props = {
  searchParams: SearchParams;
  params: {
    locale: string;
  };
};

export const dynamic = 'force-dynamic';

export default async function Registered({ searchParams }: Props) {
  const userId = searchParams['user-id'] as string | null;
  if (!userId) {
    redirect('/sign-up', RedirectType.replace);
  }
  const registeredUser = await UserService.getUserById(userId);

  return (
    <AuthLayout size='lg'>
      <div className='card w-full'>
        <h3 className='text-lg font-bold'>Welcome, {registeredUser.name}!</h3>
        <p>You have just registered successfully.</p>
        <p>
          Please check your verification email on{' '}
          <span className='text-blue-700 font-bold underline'>{registeredUser.email}</span> to
          active full account feature.
        </p>
      </div>
    </AuthLayout>
  );
}
