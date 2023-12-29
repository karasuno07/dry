import SignOutNotification from './SignOutNotification';

type Props = {
  params: {
    locale: string;
  };
};

export default function SignOut({ params: { locale } }: Props) {
  return (
    <div className='w-screen h-screen relative'>
      <SignOutNotification />
    </div>
  );
}

export const dynamic = 'force-dynamic';
