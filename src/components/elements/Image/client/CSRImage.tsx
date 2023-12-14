'use client';

import Image, { ImageProps, StaticImageData } from 'next/image';
import { useState } from 'react';
import notFound from '~/assets/images/404-not-found.svg';
import spinner from '~/assets/images/spinner.svg';

type Props = ImageProps & {
  notFoundSrc?: string | StaticImageData;
};

export default function CSRImage({ src, alt, notFoundSrc, ...imageProps }: Props) {
  const [loading, setLoading] = useState<boolean>(true);

  const generateImageProps = () => {
    const props: Omit<ImageProps, 'alt'> = {
      src,
      width: undefined,
      height: undefined,
      ...imageProps,
    };
    if (loading) {
      props.src = spinner;
      props.priority = true;
      props.fill = false;
      props.sizes = undefined;
      props.width = 370;
      props.height = 216;
    } else {
      props.src = src || notFoundSrc || notFound;
      props.priority = !src;
    }

    return props;
  };

  return (
    <Image
      {...generateImageProps()}
      alt={alt || 'Not Found Image'}
      onLoad={(evt) => {
        setLoading(false);
      }}
    />
  );
}
