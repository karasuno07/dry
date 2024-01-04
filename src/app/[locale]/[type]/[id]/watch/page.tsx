import classNames from 'classnames/bind';
import { SearchParams } from 'types/api';
import { LocaleType } from 'types/locale';
import { VideoType } from 'types/ui';
import styles from './Watch.module.scss';

const cx = classNames.bind(styles);

type Props = {
  searchParams: SearchParams;
  params: {
    locale: LocaleType;
    type: VideoType;
    id: number;
  };
};

export default function WatchVideo({ searchParams }: Props) {
  const _videoServer = (searchParams.server as string) || 'vidsrc.to';
  return (
    <div className={cx('root')}>
      <div className={cx('player')}>
        <video src='' />
      </div>
    </div>
  );
}
