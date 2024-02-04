import Badge from '@components/ui/Badge';
import classNames from 'classnames/bind';
import { useTranslations } from 'next-intl';
import { Genre } from '~/service/tmdb/model/Categories';
import styles from './Genres.module.scss';

const cx = classNames.bind(styles);

type Props = {
  genres: Genre[];
};

export default function Genres({ genres }: Props) {
  const translate = useTranslations('videos');

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
