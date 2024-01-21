import { generatePlaceholderImage } from '@lib/helper';
import { isEmpty } from 'lodash';
import Image, { ImageProps, StaticImageData } from 'next/image';
import notFound from '~/assets/images/404-not-found.svg';

type Props = ImageProps & {
  externalLink?: boolean;
  notFoundSrc?: string | StaticImageData;
};

export default async function SSRImage({
  src,
  alt,
  fill,
  externalLink = true,
  notFoundSrc,
  ...imageProps
}: Props) {
  if (isEmpty(src)) {
    return (
      <Image
        src={notFoundSrc || notFound}
        alt='Not Found Image'
        fill
        sizes='(min-width: 1024px) 370px'
        {...imageProps}
      />
    );
  }

  if (externalLink) {
    const {
      base64,
      img: { width, height },
    } = await generatePlaceholderImage(src as string);

    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        placeholder='blur'
        blurDataURL={base64}
        {...imageProps}
      />
    );
  } else {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? imageProps.width : undefined}
        height={!fill ? imageProps.height : undefined}
        placeholder='blur'
        {...imageProps}
      />
    );
  }
}
