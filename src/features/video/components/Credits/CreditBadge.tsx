'use client';

import CSRImage from '@components/elements/Image/client/CSRImage';
import { Link } from '@lib/navigation';
import { Person } from '@model/People';
import classNames from 'classnames/bind';
import { Tooltip } from 'react-tooltip';
import useSWR from 'swr';
import BlankProfileFemale from '~/assets/icons/blank-profile-female.svg';
import BlankProfileMale from '~/assets/icons/blank-profile-male.svg';
import { UTILS } from '~/service/tmdb/base';
import CreditsService, { buildGetPersonDetailsEndpoint } from '~/service/tmdb/credits';
import styles from './Credits.module.scss';

const cx = classNames.bind(styles);

type CreditBadgeProps = {
  personId: number;
  characterName: string;
  gender: number;
};

export default function CreditBadge({ personId, characterName, gender }: CreditBadgeProps) {
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
