'use client';

import classNames from 'classnames/bind';
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './LoadingSpinner.module.scss';

const cx = classNames.bind(styles);

type Props = {
  type?: 'text' | 'animate';
};

export default function LoadingSpinner({ type = 'animate' }: Props) {
  const spinnerRef = useRef<HTMLSpanElement>(null);

  return (
    <div className={cx('root', 'absolute-center')}>
      {type === 'text' && 'Loading...'}
      <CSSTransition
        in={type === 'animate'}
        nodeRef={spinnerRef}
        classNames={{
          enter: cx('spinner'),
          exitActive: cx('exiting'),
        }}
        timeout={{
          enter: 0,
          exit: 200,
        }}
      >
        <span ref={spinnerRef} className={cx('spinner')} />
      </CSSTransition>
    </div>
  );
}
