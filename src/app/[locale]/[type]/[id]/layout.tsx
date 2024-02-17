import VideoService from '@features/video/service';
import { Movie, TvSeries } from '@services/tmdb/model/Videos';
import { Metadata } from 'next';
import { PropsWithChildren } from 'react';
import { LocaleType } from 'types/locale';
import { DiscoverType } from 'types/tmdb/api';

type Props = {
  params: {
    locale: LocaleType;
    type: DiscoverType;
    id: number;
  };
};

export async function generateMetadata({ params: { type, id, locale } }: Props): Promise<Metadata> {
  const metadata = await VideoService.getDetails(type, id, locale);

  return {
    title: type === 'movie' ? (metadata as Movie).title : (metadata as TvSeries).name,
  };
}

export default function VideoLayout({ children }: PropsWithChildren) {
  return children;
}
