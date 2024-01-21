'use client';

import Image, { ImageProps, StaticImageData } from 'next/image';
import { useState } from 'react';
import notFound from '~/assets/images/404-not-found.svg';
import spinner from '~/assets/images/spinner.svg';

type Props = ImageProps & {
  loadingSrc?: string | StaticImageData;
  notFoundSrc?: string | StaticImageData;
};

export default function CSRImage({
  src,
  alt,
  loadingSrc = spinner,
  notFoundSrc = notFound,
  ...imageProps
}: Props) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const generateImageProps = () => {
    const props: Omit<ImageProps, 'alt'> = {
      src: src || notFoundSrc,
      width: undefined,
      height: undefined,
      ...imageProps,
    };
    if (loading) {
      props.src = loadingSrc;
      props.priority = true;
      props.fill = false;
      props.sizes = undefined;
      props.width = 370;
      props.height = 216;
    } else if (error) {
      props.src = notFoundSrc;
      props.priority = true;
    }

    return props;
  };

  return (
    <Image
      {...generateImageProps()}
      alt={alt || 'Not Found Image'}
      onLoad={(evt) => setLoading(false)}
      onError={(evt) => {
        evt.preventDefault();
        setError(true);
      }}
    />
  );
}
