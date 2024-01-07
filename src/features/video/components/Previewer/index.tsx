import { DiscoverType } from 'types/tmdb/api';

export type PreviewerCommonProps = {
  id: number;
  title: string;
  type: DiscoverType;
  overview: string;
  className?: string;
  size?: 'sm' | 'md';
  display?: 'simple' | 'detailed';
  backdropImage: string;
};

export { default as CSRPreviewer } from './CSRPreviewer';
export { default as SSRPreviewer } from './SSRPreviewer';
export { default as SkeletonPreviewer } from './Skeleton';
