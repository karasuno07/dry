import classNames from 'classnames/bind';
import styles from './Previewer.module.scss';

const cx = classNames.bind(styles);

type SkeletonProps = {
  className?: string;
  size?: 'sm' | 'md';
};

export default function Skeleton({ className, size = 'md' }: SkeletonProps) {
  return <div className={cx('root', 'skeleton', { [size]: true }, className)} />;
}
