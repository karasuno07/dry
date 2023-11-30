import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

type LoadingImageProps = {
  src: StaticImport;
  alt?: string;
  width: number;
  height: number;
};

export default function LoadingImage({
  src,
  alt = 'Loading Image',
  width,
  height,
}: LoadingImageProps) {
  return <Image src={src} alt={alt} width={width} height={height} priority />;
}
