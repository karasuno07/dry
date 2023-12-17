import LoadingImage from '@components/elements/Image/server/LoadingImage';
import SSRImage from '@components/elements/Image/server/SSRImage';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { Suspense } from 'react';
import { VideoType } from 'ui';
import spinner from '~/assets/images/spinner.svg';
import InteractiveOverlay from './InteractiveOverlay';
import styles from './Previewer.module.scss';

const cx = classNames.bind(styles);

type Props = {
  id: number;
  title: string;
  type: VideoType;
  backdropImage: string;
  className?: string;
  size?: 'sm' | 'md';
};

export default function Previewer({
  className,
  id,
  title,
  type,
  backdropImage,
  size = 'md',
}: Props) {
  return (
    <div className={cx('root', { [size]: true }, className)}>
      <InteractiveOverlay videoLink={`/${type}/${id}/info`} />
      <div className={cx('backdrop-container')}>
        <Suspense fallback={<LoadingImage src={spinner} width={128} height={128} />}>
          <SSRImage
            src={backdropImage}
            alt='#'
            quality={80}
            fill
            sizes='(min-width: 1024px) 370px'
          />
        </Suspense>
      </div>
      <div className={cx('info')}>
        <Link className={cx('title')} href={`/${type}/${id}/info`} title={title}>
          {title}
        </Link>
      </div>
    </div>
  );
}

type SkeletonProps = {
  className?: string;
  size?: 'sm' | 'md';
};

export function SkeletonPreviewer({ className, size = 'md' }: SkeletonProps) {
  return <div className={cx('root', { [size]: true }, className)} />;
}
