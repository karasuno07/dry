'use client';

import Badge from '@components/elements/Badge';
import { Person } from '@model/People';
import classNames from 'classnames/bind';
import useSWR from 'swr';
import { DiscoverType } from 'tmdb/api';
import CreditsService, {
  CreditsResponse,
  buildGetCreditsEndpoint,
  buildGetPersonDetailsEndpoint,
} from '~/service/tmdb/credits';
import styles from './Credits.module.scss';

const cx = classNames.bind(styles);

type CreditsProps = {
  videoType: DiscoverType;
  videoId: number;
  className?: string;
  title?: string;
};

function Credits({ videoType, videoId, className, title = 'Casts' }: CreditsProps) {
  const { data: credits } = useSWR<CreditsResponse>(
    buildGetCreditsEndpoint(videoType, videoId),
    CreditsService.http.get
  );

  return (
    <div className={cx('root', className)}>
      <span className={cx('title')}>{title}</span>
      <div className={cx('list')}>
        {credits &&
          credits.cast.map((p) => <CreditBadge key={p.id} personId={p.id} personName={p.name} />)}
      </div>
    </div>
  );
}

type CreditBadgeProps = {
  personId: number;
  personName?: string;
};

function CreditBadge({ personId, personName }: CreditBadgeProps) {
  const { data, isLoading } = useSWR<Person>(
    buildGetPersonDetailsEndpoint(personId),
    CreditsService.http.get
  );

  if (isLoading || !data) {
    return (
      <Badge className={cx('skeleton-item')} href='#'>
        {personName || '...'}
      </Badge>
    );
  }

  const imdbLink = `https://www.imdb.com/name/${data.imdb_id}`;

  return (
    <Badge href={imdbLink} external>
      {data.name}
    </Badge>
  );
}

export default Credits;
