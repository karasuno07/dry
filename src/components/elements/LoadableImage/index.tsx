import { generatePlaceholderImage } from '@lib/helper';
import { isEmpty } from 'lodash';
import Image, { ImageProps } from 'next/image';
import notFound from '~/assets/images/404-not-found.svg';

type Props = ImageProps & {};

async function LoadableImage({ src, alt, fill, ...imageProps }: Props) {
  if (isEmpty(src)) {
    return <Image priority src={notFound} alt='not found image' fill {...imageProps} />;
  }

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
}

export default LoadableImage;
