'use client';

import classNames from 'classnames/bind';
import useSWR from 'swr';
import { DiscoverType } from 'types/tmdb/api';
import CreditsService, { CreditsResponse, buildGetCreditsEndpoint } from '~/service/tmdb/credits';
import CreditBadge from './CreditBadge';
import styles from './Credits.module.scss';

const cx = classNames.bind(styles);

type CreditsProps = {
  videoType: DiscoverType;
  videoId: number;
  className?: string;
  title?: string;
};

function Credits({ videoType, videoId, className, title = 'Casts' }: CreditsProps) {
  const { data } = useSWR(
    buildGetCreditsEndpoint(videoType, videoId),
    CreditsService.get<CreditsResponse>
  );

  const credits = data;

  if (credits?.cast.length === 0) {
    return undefined;
  }

  return (
    <div className={cx('root', className)}>
      <span className={cx('title')}>{title}</span>
      <div className={cx('list')}>
        {credits &&
          credits.cast.map((p) => (
            <CreditBadge key={p.id} personId={p.id} characterName={p.character} gender={p.gender} />
          ))}
      </div>
    </div>
  );
}



export default Credits;
