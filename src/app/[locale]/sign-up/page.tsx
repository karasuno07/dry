import AuthLayout from '@features/authentication/layout';
import SignUpForm from './SignUpForm';

type Props = {
  params: {
    locale: string;
  };
};

export default function SignUp({ params: { locale } }: Props) {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
}

export const dynamic = 'force-dynamic';
