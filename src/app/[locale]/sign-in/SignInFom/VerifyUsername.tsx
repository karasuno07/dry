import Button from '@components/elements/Button';
import FormControl from '@components/elements/FormControl';
import { UserBriefResponse } from '@features/authentication/model/user';
import { useApi } from '@hooks/useApi';
import classNames from 'classnames/bind';
import { isEmpty } from 'lodash';
import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FormData } from '.';
import styles from './SignIn.module.scss';

const cx = classNames.bind(styles);

type Props = {
  setUser: Dispatch<SetStateAction<UserBriefResponse | null>>;
};

export default function VerifyUsername({ setUser }: Props) {
  const { getValues, getFieldState, reset } = useFormContext<FormData>();
  const translate = useTranslations('pages.auth');
  const { loading, GET } = useApi<UserBriefResponse>();

  const isDisabled =
    !getFieldState('username').isDirty || !isEmpty(getFieldState('username').error);

  const onVerifyUsernameHandler = async () => {
    const honeypot = getValues('pwd');
    if (!isEmpty(honeypot)) {
      return;
    }

    const username = getValues('username');
    const { data } = await GET(`/api/auth/verify/username/${username}`);
    if (data) {
      setUser(data);
    } else {
      toast.error(translate('signIn.messages.invalidUsername'));
      reset();
    }
  };

  return (
    <>
      {loading && <div className={cx('loading-bar')} />}
      <FormControl
        variant='outline'
        name='username'
        labelText={translate('form.usernameLabel')}
        placeholder={translate('form.usernamePlaceholder')}
      />
      <FormControl variant='standard' name='pwd' labelText='' type='hidden' />
      <Button
        fullSize
        type='submit'
        className={cx('sign-in-btn', 'mt-[15px]', 'px-[10px]', 'py-[15px]')}
        disabled={loading || isDisabled}
        onClick={onVerifyUsernameHandler}
        onKeyUp={(evt) => {
          if (evt.key === 'Enter' && !loading) {
            onVerifyUsernameHandler();
          }
        }}
      >
        Next
      </Button>
    </>
  );
}
