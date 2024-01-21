import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

export default function Spinner() {
  return (
    <div className={cx('loading')}>
      <span className={cx('spinner')} />
    </div>
  );
}
