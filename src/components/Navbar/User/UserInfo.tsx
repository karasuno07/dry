'use client';

import classNames from 'classnames/bind';
import { StaticImageData } from 'next/image';
import { Tooltip } from 'react-tooltip';
import styles from './User.module.scss';
import UserAvatar from './UserAvatar';

const cx = classNames.bind(styles);

type PlacesType =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

type UserInfoProps = {
  username: string;
  email: string;
  icon: string | StaticImageData;
  tooltipPosition?: 'auto' | PlacesType;
};

function UserInfo({ username, email, icon, tooltipPosition }: UserInfoProps) {
  return (
    <div className={cx('user-info')}>
      <div className='flex gap-[8px]'>
        <UserAvatar image={icon} />
        <div className='basis-full'>
          <p className={cx('text-username')}>{username}</p>
          <span className={cx('text-email')}>{email}</span>
        </div>
      </div>

      <Tooltip
        anchorSelect={'.' + cx('text-email')}
        place={tooltipPosition === 'auto' ? undefined : tooltipPosition}
        variant='dark'
        delayShow={750}
        content={email}
      />
    </div>
  );
}

export default UserInfo;
