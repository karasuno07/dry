'use client';

import Image, { StaticImageData } from 'next/image';

type Props = {
  className?: string;
  image: string | StaticImageData;
};

export default function UserAvatar({ className, image }: Props) {
  const preventDragAndDropEventHandler = (evt: React.DragEvent<HTMLImageElement>) => {
    evt.preventDefault();
  };

  return (
    <Image
      className={className}
      src={image}
      alt='user-avatar'
      width={40}
      height={40}
      onDragStart={preventDragAndDropEventHandler}
      onDrop={preventDragAndDropEventHandler}
    />
  );
}
