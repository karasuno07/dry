import classNames from 'classnames/bind';
import { LocaleType } from 'types/locale';
import { VideoType } from 'types/ui';
import styles from './Watch.module.scss';

const cx = classNames.bind(styles);

type Props = {
  params: {
    locale: LocaleType;
    type: VideoType;
    id: number;
  };
};

export default function WatchVideo({}: Props) {
  return (
    <div className={cx('root')}>
      <div className={cx('player')}></div>
    </div>
  );
}
