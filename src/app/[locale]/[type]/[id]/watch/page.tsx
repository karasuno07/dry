import classNames from 'classnames/bind';
import { VideoType } from 'types/ui';
import { LocaleType } from '~/constants/locales';
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
