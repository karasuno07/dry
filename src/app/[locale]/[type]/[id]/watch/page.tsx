import Player from '@features/video/components/Player';
import VideoService from '@features/video/service';
import { Movie, TvSeries } from '@services/tmdb/model/Videos';
import classNames from 'classnames/bind';
import { SearchParams } from 'types/api';
import { LocaleType } from 'types/locale';
import { DiscoverType } from 'types/tmdb/api';
import styles from './Watch.module.scss';

const cx = classNames.bind(styles);

type Props = {
  searchParams: SearchParams;
  params: {
    locale: LocaleType;
    type: DiscoverType;
    id: number;
  };
};

export default async function WatchVideo({ params: { type, id, locale } }: Props) {
  const metadata = await VideoService.getDetails(type, id, locale);
  const name = type === 'tv' ? (metadata as TvSeries).name : (metadata as Movie).title;

  const seasonInfo = () => {
    if (type === 'movie') return undefined;
    const tvMetadata = metadata as TvSeries;
    return tvMetadata.seasons.map((s) => ({
      seasonNumber: s.season_number,
      name: s.name,
      episodes: s.episode_count,
    }));
  };

  return (
    <div className={cx('root')}>
      <Player type={type} id={id} name={name} seasons={seasonInfo()} />
    </div>
  );
}
