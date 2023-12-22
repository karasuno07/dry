'use client';

// import LoadingImage from '@components/elements/Image/server/LoadingImage';
import classNames from 'classnames/bind';
// import Image from 'next/image';
import Link from 'next/link';
// import { Suspense } from 'react';
// import spinner from '~/assets/images/spinner.svg';
import { PreviewerCommonProps } from '.';
// import InteractiveOverlay from './InteractiveOverlay';
import styles from './Previewer.module.scss';

const cx = classNames.bind(styles);

type ClientRenderProps = PreviewerCommonProps & {
  render: 'client';
};

export default function CSRPreviewer({
  className,
  id,
  title,
  type,
  size = 'md',
  backdropImage,
}: ClientRenderProps) {
  return (
    <div className={cx('root', { [size]: true }, className)}>
      {/* <InteractiveOverlay videoLink={`/${type}/${id}/info`} />
      <div className={cx('backdrop-container')}>
        <Suspense fallback={<LoadingImage src={spinner} width={128} height={128} />}>
          <Image src={backdropImage} alt='#' quality={80} fill sizes='(min-width: 1024px) 370px' />
        </Suspense>
      </div> */}
      <div className={cx('info')}>
        <Link className={cx('title')} href={`/${type}/${id}/info`} title={title}>
          {title}
        </Link>
      </div>
    </div>
  );
}
