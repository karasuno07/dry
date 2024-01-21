'use client';

import UserAvatar from '@components/ui/Avatar';
import classNames from 'classnames/bind';
import { StaticImageData } from 'next/image';
import { Tooltip } from 'react-tooltip';
import styles from './User.module.scss';

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
  type: 'mobile' | 'desktop';
  username: string;
  email: string;
  icon: string | StaticImageData;
  tooltipPosition?: 'auto' | PlacesType;
};

function UserInfo({ type, username, email, icon, tooltipPosition }: UserInfoProps) {
  return (
    <div className={cx('user-info', { [type]: true })}>
      <div className={cx('flex w-full gap-[8px]', { 'items-center': type === 'mobile' })}>
        <UserAvatar rounded={type === 'mobile'} image={icon} size={type === 'mobile' ? 64 : 52} />
        <div className='basis-full'>
          <p className={cx('text-username')}>{username}</p>
          <span className={cx('text-email')}>{email}</span>
        </div>
      </div>

      {type === 'desktop' && (
        <Tooltip
          anchorSelect={'.' + cx('text-email')}
          place={tooltipPosition === 'auto' ? undefined : tooltipPosition}
          variant='dark'
          delayShow={750}
          content={email}
        />
      )}
    </div>
  );
}

export default UserInfo;
