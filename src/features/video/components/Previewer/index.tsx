'use client';

import LoadingSpinner from '@components/elements/LoadingSpinner';
import classNames from 'classnames/bind';
import Image from 'next/image';
import styles from './Previewer.module.scss';

const cx = classNames.bind(styles);

type Props = {
  backdropImage: string;
};

function Previewer({ backdropImage }: Props) {
  console.log(backdropImage);

  return (
    <div className={cx('root')}>
      <Image src={backdropImage || ''} alt='' fill />
      <LoadingSpinner />
    </div>
  );
}

export default Previewer;
