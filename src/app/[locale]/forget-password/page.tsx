import AuthLayout from '@features/authentication/layout';

type Props = {
  params: {
    locale: string;
  };
};

function ForgetPassword({}: Props) {
  return <AuthLayout>ForgetPassword</AuthLayout>;
}

export default ForgetPassword;
