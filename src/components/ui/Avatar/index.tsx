'use client';

import defaultUser from '@icons/user-default-64.png';
import cx from 'classnames';
import Image, { StaticImageData } from 'next/image';

type Props = {
  className?: string;
  rounded?: boolean;
  image?: string | StaticImageData;
  size?: number;
};

export default function UserAvatar({ className, rounded = true, image, size = 40 }: Props) {
  const preventDragAndDropEventHandler = (evt: React.DragEvent<HTMLImageElement>) => {
    evt.preventDefault();
  };

  return (
    <Image
      className={cx(className, { 'rounded-full': rounded })}
      src={image || defaultUser}
      alt='user-avatar'
      width={size}
      height={size}
      onDragStart={preventDragAndDropEventHandler}
      onDrop={preventDragAndDropEventHandler}
    />
  );
}
