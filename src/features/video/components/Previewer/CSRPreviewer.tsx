'use client';

import CSRImage from '@components/elements/Image/client/CSRImage';
import classNames from 'classnames/bind';
import Link from 'next/link';
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
  return (
    <div className={cx('root', { [size]: true }, className)}>
      <InteractiveOverlay videoLink={`/${type}/${id}/info`} />
      <div className={cx('backdrop-container')}>
        <CSRImage
          src={backdropImage}
          alt={title}
          fill
          sizes='(min-width: 1024px) 370px'
          quality={80}
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
