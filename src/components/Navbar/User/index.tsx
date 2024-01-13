'use client';

import UserAvatar from '@components/elements/Avatar';
import Button from '@components/elements/Button';
import Divider from '@components/elements/Divider';
import Icon from '@components/elements/Icon';
import Menu from '@components/elements/Menu';
import defaultUser from '@icons/user-default-64.png';
import classNames from 'classnames/bind';
import { capitalize, isEmpty } from 'lodash';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { FaCircleUser, FaPowerOff } from 'react-icons/fa6';
import styles from './User.module.scss';
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
            anchor={<UserAvatar className='border border-gray-700' image={userImage} />}
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
                key={'sign-out-btn'}
                className={cx('sign-out')}
                fullSize
                variant='danger'
                link={{ href: '/sign-out' }}
              >
                <Icon icon={FaPowerOff} size={22} />
                <span>{translate('signOutBtn')}</span>
              </Button>,
            ]}
          />
        )}
      </div>
    </div>
  );
}
