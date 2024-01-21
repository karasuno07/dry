import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import Spinner from './Spinner';
import Waver from './Waver';

const cx = classNames.bind(styles);

export type LoadingProps = {
  loadingAnimation: 'wave' | 'spin';
  className?: string;
};

export default function Loading({ loadingAnimation, className }: LoadingProps) {
  return (
    <div className={cx('root', className)}>
      {loadingAnimation === 'wave' && <Waver />}
      {loadingAnimation === 'spin' && <Spinner />}
    </div>
  );
}
