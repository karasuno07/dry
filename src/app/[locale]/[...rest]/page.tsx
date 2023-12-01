import HistoryNagivator from '@features/navigation/components/HistoryNavigator';
import classNames from 'classnames/bind';
import Link from 'next/link';
import styles from './stylesheet.module.scss';

const cx = classNames.bind(styles);

export default function CatchUnknownPage() {
  return (
    <div className={cx('container')}>
      <div className={cx('noise')}></div>
      <div className={cx('overlay')}></div>
      <div className={cx('terminal')}>
        <h1>
          Error <span className={cx('errorcode')}>404</span>
        </h1>
        <p className={cx('output')}>
          The page you are looking for might have been removed, had its name changed or is
          temporarily unavailable.
        </p>
        <p className={cx('output')}>
          Please try to <HistoryNagivator action='back'>go back</HistoryNagivator> or{' '}
          <Link href='/'>return to the homepage</Link>.
        </p>
        <p className={cx('output')}>Good luck.</p>
      </div>
    </div>
  );
}
