'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import notFound from '~/assets/images/404-not-found.svg';
import spinner from '~/assets/images/spinner.gif';

type Props = ImageProps & {};

function LoadableImage({ src, alt, ...imageProps }: Props) {
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
      props.src = src || notFound;
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

export default LoadableImage;
