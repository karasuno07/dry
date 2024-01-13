import Badge from '@components/elements/Badge';
import classNames from 'classnames/bind';
import { getTranslations } from 'next-intl/server';
import { Genre } from '~/service/tmdb/model/Categories';
import styles from './Genres.module.scss';

const cx = classNames.bind(styles);

type Props = {
  genres: Genre[];
};

export default async function Genres({ genres }: Props) {
  const translate = await getTranslations('videos');

  return (
    <div className={cx('root')}>
      <span>{translate('genres')}</span>
      {genres.map((genre) => (
        <Badge key={genre.id} variant='dark'>
          {genre.name}
        </Badge>
      ))}
    </div>
  );
}
