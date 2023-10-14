'use client';

import LoadingSpinner from '@components/elements/LoadingSpinner';
import classNames from 'classnames/bind';
import styles from './Previewer.module.scss';

const cx = classNames.bind(styles);

type Props = {};

function Previewer(props: Props) {
  return (
    <div className={cx('root')}>
      <LoadingSpinner />
    </div>
  );
}

export default Previewer;
