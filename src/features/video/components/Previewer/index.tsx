import { VideoType } from 'types/ui';

export type PreviewerCommonProps = {
  id: number;
  title: string;
  type: VideoType;
  overview: string;
  className?: string;
  size?: 'sm' | 'md';
  display?: 'simple' | 'detailed';
  backdropImage: string;
};

export { default as CSRPreviewer } from './CSRPreviewer';
export { default as SSRPreviewer } from './SSRPreviewer';
export { default as SkeletonPreviewer } from './Skeleton';
