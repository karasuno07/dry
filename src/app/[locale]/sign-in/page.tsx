import AuthLayout from '@features/authentication/layout';
import SignInForm from './SignInForm';

type Props = {
  params: {
    locale: string;
  };
};

export default function SignIn({ params: { locale = 'en' } }: Props) {
  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
}

export const dynamic = 'force-dynamic';
