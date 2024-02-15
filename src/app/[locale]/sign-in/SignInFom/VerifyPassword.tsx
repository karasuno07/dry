import UserAvatar from '@components/ui/Avatar';
import Button from '@components/ui/Button';
import FormControl from '@components/ui/FormControl';
import { AUTH_ERROR } from '@features/authentication/constants';
import { UserBriefResponse } from '@features/authentication/model/user';
import { isEmpty } from '@lib/object';
import classNames from 'classnames/bind';
import { signIn } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FormData } from '.';
import styles from './SignIn.module.scss';

const cx = classNames.bind(styles);

type Props = {
  user: UserBriefResponse;
};

export default function VerifyPassword({ user }: Props) {
  const {
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useFormContext<FormData>();
  const router = useRouter();
  const translate = useTranslations('pages.auth');

  const isDisabled = !isDirty || !isEmpty(errors);

  const onSubmitLoginHandler = async (data: FormData, evt: any) => {
    const response = await signIn('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
      callbackUrl: '/',
    });

    if (!response?.ok) {
      // TODO: handle for this case
    }

    if (response?.error) {
      console.error(response.error);
      switch (response.error) {
        case AUTH_ERROR.MISSING_AUTH_PARAMS:
          toast.error(translate('signIn.messages.missingParamsError'));
          router.push(`?${new URLSearchParams({ error: response.error })}`);
          reset();
          break;
        case AUTH_ERROR.CREDENTIALS_MISMATCH:
          toast.error(translate('signIn.messages.credentialsMismatchError'));
          router.push(`?${new URLSearchParams({ error: response.error })}`);
          reset();
          break;
        case AUTH_ERROR.LOGIN_ATTEMPTS_FAILED:
          console.log(response.error);
          toast.error(translate('signIn.messages.exceedLoginAttemptsFailed'));
          router.push(`?${new URLSearchParams({ error: response.error })}`);
          reset();
          break;
        default:
          toast.error('UNKNOWN ERROR!');
          reset();
          break;
      }
    } else {
      router.replace('/');
    }
  };

  return (
    <>
      <div className={cx('user')}>
        <p>
          {translate('signIn.welcome')}
          <b>{user.name}</b>
        </p>
        <UserAvatar image={user.image} />
      </div>
      <FormControl
        variant='outline'
        name='password'
        labelText={translate('form.passwordLabel')}
        type='password'
        placeholder={translate('form.passwordPlaceholder')}
      />
      <Button
        fullSize
        type='submit'
        className={cx('sign-in-btn', 'mt-[15px]', 'px-[10px]', 'py-[15px]')}
        disabled={isDisabled}
        onClick={handleSubmit(onSubmitLoginHandler)}
        onKeyUp={(evt) => {
          if (evt.key === 'Enter' && isDisabled) {
            handleSubmit(onSubmitLoginHandler);
          }
        }}
      >
        {translate('signIn.loginBtn')}
      </Button>
    </>
  );
}
