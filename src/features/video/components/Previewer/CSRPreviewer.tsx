'use client';

import classNames from 'classnames/bind';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import notFound from '~/assets/images/404-not-found.svg';
import spinner from '~/assets/images/spinner.svg';
import { PreviewerCommonProps } from '.';
import InteractiveOverlay from './InteractiveOverlay';
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  let imageSrc = spinner;
  if (!loading && !error) {
    imageSrc = backdropImage;
  } else if (error) {
    imageSrc = notFound;
  }

  return (
    <div className={cx('root', { [size]: true }, className)}>
      <InteractiveOverlay videoLink={`/${type}/${id}/info`} />
      <div className={cx('backdrop-container')}>
        <Image
          src={imageSrc}
          alt={title}
          onLoad={() => setLoading(false)}
          onError={() => setError(true)}
          quality={80}
          fill
          sizes='(min-width: 1024px) 370px'
        />
      </div>
      <div className={cx('info')}>
        <Link className={cx('title')} href={`/${type}/${id}/info`} title={title}>
          {title}
        </Link>
      </div>
    </div>
  );
}
