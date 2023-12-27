import className from 'classnames/bind';
import React from 'react';
import styles from './Stack.module.scss';

const cx = className.bind(styles);

type Props = {
  className?: string;
};

export default function Stack({ className, children }: React.PropsWithChildren<Props>) {
  return <div className={cx('root', className)}>{children}</div>;
}
