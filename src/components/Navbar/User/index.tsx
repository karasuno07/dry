'use client';

import UserAvatar from '@components/ui/Avatar';
import Button from '@components/ui/Button';
import Divider from '@components/ui/Divider';
import Icon from '@components/ui/Icon';
import Menu from '@components/ui/Menu';
import SignOutButton from '@features/authentication/components/SignOutButton';
import { SessionUser } from '@features/authentication/model/user';
import defaultUser from '@icons/user-default-64.png';
import { capitalize } from '@lib/object';
import classNames from 'classnames/bind';
import { FaCircleUser } from 'react-icons/fa6';
import styles from './User.module.scss';
import UserInfo from './UserInfo';

const cx = classNames.bind(styles);

type Props = {
  user?: SessionUser;
  type: 'mobile' | 'desktop';
};

export default function User({ user, type }: Props) {
  const userName =
    user?.name
      ?.split(' ')
      .map((token) => capitalize(token))
      .join(' ') || '';
  const userImage = user?.image || defaultUser;

  return (
    <div className={cx('root', { [type]: true })}>
      {type === 'mobile' && (
        <UserInfo type='mobile' username={userName} email={user?.email || ''} icon={userImage} />
      )}
      {type === 'desktop' && (
        <div className={cx('flex justify-center items-center gap-4')}>
          {user ? (
            <Menu
              hover
              position='right'
              anchor={<UserAvatar className='border border-gray-700' image={userImage} />}
              items={[
                <UserInfo
                  key='user-info'
                  type='desktop'
                  username={userName}
                  email={user.email || ''}
                  icon={userImage}
                  tooltipPosition='left'
                />,
                <Divider key='divider-01' />,
                <SignOutButton key='sign-out' type='desktop' />,
              ]}
            />
          ) : (
            <Button className={cx('sign-in')} paddingLess link={{ href: '/sign-in' }}>
              <Icon icon={FaCircleUser} size={30} />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
