import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

export default function Waver() {
  const waves = Array(10)
    .fill(0)
    .map((_, idx) => <div key={idx} className={cx('wave', `wave-${idx + 1}`)} />);
  return <div className={cx('loading')}>{waves}</div>;
}
