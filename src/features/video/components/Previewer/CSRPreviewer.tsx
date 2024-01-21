'use client';

import CSRImage from '@components/ui/Image/client/CSRImage';
import { Link } from '@lib/navigation';
import classNames from 'classnames/bind';
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
  overview,
  type,
  size = 'md',
  display = 'simple',
  backdropImage,
}: ClientRenderProps) {
  const backdrop = (
    <div className={cx('backdrop-container')}>
      <CSRImage
        src={backdropImage}
        alt={title}
        fill
        sizes='(min-width: 1024px) 370px'
        quality={80}
      />
    </div>
  );

  const renderPreviewComponents = () => {
    if (display === 'simple') {
      return backdrop;
    } else {
      return (
        <div className={cx('preview-container')}>
          {backdrop}
          <div className={cx('detailed-container')}>
            <p className={cx('overview')}>{overview}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className={cx('root', { [size]: true, detailed: display === 'detailed' }, className)}>
      <InteractiveOverlay videoLink={`/${type}/${id}/info`} />
      {renderPreviewComponents()}
      <div className={cx('info')}>
        <Link className={cx('title')} href={`/${type}/${id}/info`} title={title}>
          {title}
        </Link>
      </div>
    </div>
  );
}
