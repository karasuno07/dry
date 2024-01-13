'use client';

import CSRImage from '@components/elements/Image/client/CSRImage';
import { Link } from '@lib/navigation';
import classNames from 'classnames/bind';
import { Tooltip } from 'react-tooltip';
import useSWR from 'swr';
import BlankProfileFemale from '~/assets/icons/blank-profile-female.svg';
import BlankProfileMale from '~/assets/icons/blank-profile-male.svg';
import { UTILS } from '~/service/tmdb/base';
import CreditsService, { buildGetPersonDetailsEndpoint } from '~/service/tmdb/credits';
import { Person } from '~/service/tmdb/model/People';
import styles from './Credits.module.scss';

const cx = classNames.bind(styles);

type CreditBadgeProps = {
  personId: number;
  characterName: string;
  gender: number;
};

export default function CreditBadge({ personId, characterName, gender }: CreditBadgeProps) {
  const { data: person, isLoading } = useSWR(
    buildGetPersonDetailsEndpoint(personId),
    CreditsService.get<Person>
  );
  const placeholderImage = gender === 1 ? BlankProfileFemale : BlankProfileMale;

  if (isLoading || !person) {
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

  const imdbLink = person.imdb_id ? `https://www.imdb.com/name/${person.imdb_id}` : undefined;
  const creditContent = (
    <>
      <CSRImage
        className={cx('profile-image', { 'not-found': !person.profile_path })}
        src={UTILS.buildImageUrl(person.profile_path, 'w154')}
        width={128}
        height={196}
        alt={String(personId)}
        notFoundSrc={placeholderImage}
      />
      <Tooltip className='text-center' anchorSelect={`#cast-${person.id}`} offset={2}>
        <p className='text-lg text-green-300 font-semibold'>{person.name}</p>
        <p>
          as <span className='font-semibold'>{characterName}</span>
        </p>
      </Tooltip>
    </>
  );

  if (imdbLink) {
    return (
      <Link
        id={`cast-${person.id}`}
        className={cx('image-wrapper')}
        href={imdbLink}
        target='_blank'
      >
        {creditContent}
      </Link>
    );
  }

  return (
    <div id={`cast-${person.id}`} className={cx('image-wrapper')}>
      {creditContent}
    </div>
  );
}
