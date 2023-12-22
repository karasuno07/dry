'use client';

import Pagination from '@components/Pagination';
import Grid from '@components/elements/Grid';
import { CSRPreviewer as Previewer } from '@features/video/components/Previewer';
import useSearchVideos from '@features/video/hooks/useSearchVideos';
import classNames from 'classnames/bind';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { DisplayMode, VideoType } from 'ui';
import { LocaleType } from '~/constants/locales';
import styles from './VideoList.module.scss';

const cx = classNames.bind(styles);
const limit = 20; // the fixed number tmdb api supports

type Props = {};

export default function VideoListV2({}: Props) {
  const searchParams = useSearchParams();
  const language = (useLocale() as LocaleType) || 'en';

  const display = (searchParams.get('display') as DisplayMode) || 'grid';
  const type = (searchParams.get('type') as VideoType) || 'movie';
  const slug = (searchParams.get('category') as string) || '';
  const page = Number(searchParams.get('page') as string) || 1;

  const Layout = display === 'grid' ? Grid : 'div';
  const searchType = type === 'tv-series' ? 'tv' : 'movie';

  const { videos, totalPages } = useSearchVideos({
    type: searchType,
    categorySlug: slug,
    params: {
      page,
      language,
      include_adult: true,
    },
  });

  return (
    <section>
      <Layout className={cx('root')} template='cols'>
        {videos &&
          videos.map((video) => (
            <Previewer
              render='client'
              key={video.id}
              id={video.id}
              title={video.title}
              type={type}
              backdropImage={video.backdrop_path}
            />
          ))}
      </Layout>
      <Pagination totalPage={totalPages || 5} itemPerPage={limit} />
    </section>
  );
}
