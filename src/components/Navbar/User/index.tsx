'use client';

import Button from '@components/elements/Button';
import Divider from '@components/elements/Divider';
import Icon from '@components/elements/Icon';
import Menu from '@components/elements/Menu';
import defaultUser from '@icons/user-default-64.png';
import classNames from 'classnames/bind';
import { capitalize, isEmpty } from 'lodash';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { FaCircleUser } from 'react-icons/fa6';
import { IoLogOut } from 'react-icons/io5';
import styles from './User.module.scss';
import UserAvatar from './UserAvatar';
import UserInfo from './UserInfo';

const cx = classNames.bind(styles);

export default function User() {
  const translate = useTranslations('components.navBar');
  const { data: session } = useSession();
  const user = session?.user;
  const userImage = user?.image || defaultUser;

  return (
    <div className={cx('root')}>
      <div className={cx('flex justify-center items-center gap-4')}>
        {isEmpty(user) ? (
          <Button className={cx('sign-in')} paddingLess link={{ href: '/sign-in' }}>
            <Icon icon={FaCircleUser} size={30} />
          </Button>
        ) : (
          <Menu
            hover
            position='right'
            anchor={
              <UserAvatar className='rounded-full border border-gray-700' image={userImage} />
            }
            items={[
              <UserInfo
                key='user-info'
                username={capitalize(user.name || '')}
                email={user.email || ''}
                icon={userImage}
                tooltipPosition='left'
              />,
              <Divider key='divider-01' />,
              <Button
                className='text-center'
                fullSize
                key={'sign-out-btn'}
                variant='danger'
                link={{ href: '/sign-out' }}
              >
                <Icon icon={IoLogOut} size={20} />
                <span>{translate('signOutBtn')}</span>
              </Button>,
            ]}
          />
        )}
      </div>
    </div>
  );
}
