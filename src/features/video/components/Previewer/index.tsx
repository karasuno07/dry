import classNames from 'classnames/bind';
import { VideoType } from 'ui';
import styles from './Previewer.module.scss';

const cx = classNames.bind(styles);

export type PreviewerCommonProps = {
  id: number;
  title: string;
  type: VideoType;
  className?: string;
  size?: 'sm' | 'md';
  backdropImage: string;
};

type SkeletonProps = {
  className?: string;
  size?: 'sm' | 'md';
};

export function SkeletonPreviewer({ className, size = 'md' }: SkeletonProps) {
  return <div className={cx('root', { [size]: true }, className)} />;
}

export { default as CSRPreviewer } from './CSRPreviewer';
export { default as SSRPreviewer } from './SSRPreviewer';
