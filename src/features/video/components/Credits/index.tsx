'use client';

import CSRImage from '@components/elements/Image/client/CSRImage';
import { Person } from '@model/People';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';
import useSWR from 'swr';
import { DiscoverType } from 'types/tmdb/api';
import BlankProfileFemale from '~/assets/icons/blank-profile-female.svg';
import BlankProfileMale from '~/assets/icons/blank-profile-male.svg';
import { UTILS } from '~/service/tmdb/base';
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

  if (!credits || credits.cast.length === 0) {
    return undefined;
  }

  return (
    <div className={cx('root', className)}>
      <span className={cx('title')}>{title}</span>
      <div className={cx('list')}>
        {credits.cast.map((p) => (
          <CreditBadge key={p.id} personId={p.id} characterName={p.character} gender={p.gender} />
        ))}
      </div>
    </div>
  );
}

type CreditBadgeProps = {
  personId: number;
  characterName: string;
  gender: number;
};

function CreditBadge({ personId, characterName, gender }: CreditBadgeProps) {
  const { data, isLoading } = useSWR<Person>(
    buildGetPersonDetailsEndpoint(personId),
    CreditsService.http.get
  );
  const placeholderImage = gender === 1 ? BlankProfileFemale : BlankProfileMale;

  if (isLoading || !data) {
    return (
      <div className={cx('image-wrapper', 'disabled')}>
        <CSRImage
          className={cx('profile-image', 'not-found')}
          src={placeholderImage}
          alt={String(personId)}
        />
      </div>
    );
  }

  const imdbLink = data.imdb_id ? `https://www.imdb.com/name/${data.imdb_id}` : '#';

  return (
    <Link id={`cast-${data.id}`} className={cx('image-wrapper')} href={imdbLink} target='_blank'>
      <CSRImage
        className={cx('profile-image', { 'not-found': !data.profile_path })}
        src={UTILS.buildImageUrl(data.profile_path, 'w154')}
        width={128}
        height={196}
        alt={String(personId)}
        notFoundSrc={placeholderImage}
      />
      <Tooltip className='text-center' anchorSelect={`#cast-${data.id}`} offset={2}>
        <p className='text-lg text-green-300 font-semibold'>{data.name}</p>
        <p>
          as <span className='font-semibold'>{characterName}</span>
        </p>
      </Tooltip>
    </Link>
  );
}

export default Credits;
