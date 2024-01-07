'use client';

import Button from '@components/elements/Button';
import Icon from '@components/elements/Icon';
import servers, { SupportedServer } from '@features/video/constants/server';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import { MdInfo } from 'react-icons/md';
import styles from './Player.module.scss';

const cx = classNames.bind(styles);

type Props = {
  current: SupportedServer;
  onChangeServer: (serverName: SupportedServer) => void;
};

export default function ServerList({ current, onChangeServer }: Props) {
  const translate = useTranslations('pages.video.play');

  return (
    <div className={cx('servers')}>
      <p className={cx('alert')}>
        <Icon icon={MdInfo} size={25} />
        <span>{translate('serverAlert')}</span>
      </p>
      <div className={cx('server-list')}>
        {servers.map((server) => (
          <Button
            key={server.name}
            className={cx({ active: current === server.name })}
            paddingLess
            onClick={onChangeServer.bind(null, server.name)}
          >
            {server.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
