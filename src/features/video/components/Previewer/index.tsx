import SSRImage, { LoadingImage } from '@components/elements/Image/server/Image';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { Suspense } from 'react';
import { VideoType } from 'ui';
import spinner from '~/assets/images/spinner.svg';
import styles from './Previewer.module.scss';

const cx = classNames.bind(styles);

type Props = {
  id: number;
  title: string;
  type: VideoType;
  backdropImage: string;
};

export default function Previewer({ id, title, type, backdropImage }: Props) {
  return (
    <div className={cx('root')}>
      <div className={cx('backdrop-container')}>
        <Suspense fallback={<LoadingImage src={spinner} width={128} height={128} />}>
          <SSRImage
            src={backdropImage}
            alt='#'
            quality={60}
            fill
            sizes='(min-width: 1024px) 370px'
          />
        </Suspense>
      </div>
      <div className={cx('info')}>
        <Link className={cx('title')} href={`/watch/${type}/${id}`} title={title}>
          {title}
        </Link>
      </div>
    </div>
  );
}

export function SkeletonPreviewer() {
  return <div className={cx('root')} />;
}
