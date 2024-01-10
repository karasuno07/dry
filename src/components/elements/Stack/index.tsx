import className from 'classnames/bind';
import React, { forwardRef } from 'react';
import styles from './Stack.module.scss';

const cx = className.bind(styles);

type Props = {
  className?: string;
};

const Stack = forwardRef<HTMLDivElement, React.PropsWithChildren<Props>>(function Stack(
  { className, children },
  ref
) {
  return (
    <div ref={ref} className={cx('root', className)}>
      {children}
    </div>
  );
});

export default Stack;
