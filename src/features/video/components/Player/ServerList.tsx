'use client';

import Button from '@components/ui/Button';
import Icon from '@components/ui/Icon';
import servers, { SupportedServer } from '@features/video/constants/server';
import { useIsDesktop } from '@hooks/useMediaQuery';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import { MdInfo } from 'react-icons/md';
import styles from './Player.module.scss';

const cx = classNames.bind(styles);

type Props = {
  theaterMode: boolean;
  current: SupportedServer;
  onChangeServer: (serverName: SupportedServer) => void;
};

export default function ServerList({ theaterMode, current, onChangeServer }: Props) {
  const isDesktop = useIsDesktop();
  const translate = useTranslations('pages.video.play');

  return (
    <div className={cx('servers', { hidden: theaterMode })}>
      <p className={cx('alert')}>
        <Icon icon={MdInfo} size={isDesktop ? 25 : 16} />
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
