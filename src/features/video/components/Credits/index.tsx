'use client';

import CreditsService, { CreditsResponse, buildGetCreditsEndpoint } from '@services/tmdb/credits';
import classNames from 'classnames/bind';
import useSWR from 'swr';
import { DiscoverType } from 'types/tmdb/api';
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
          credits.cast.map((p, idx) => (
            <CreditBadge key={idx} personId={p.id} characterName={p.character} gender={p.gender} />
          ))}
      </div>
    </div>
  );
}



export default Credits;
