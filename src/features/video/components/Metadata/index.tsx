import { Movie, TvSeries } from '@model/Videos';
import classNames from 'classnames/bind';
import { isEmpty } from 'lodash';
import styles from './Metadata.module.scss';

const cx = classNames.bind(styles);

import Grid from '@components/elements/Grid';
import { VideoType } from 'ui';

type Props = {
  type: VideoType;
  data: Movie | TvSeries;
};

export default function Metadata({ type, data }: Props) {
  return (
    <Grid template='cols' className={cx('root')}>
      {type === 'movie' ? (
        <MovieMetadata {...(data as Movie)} />
      ) : (
        <TvSeriesMetadata {...(data as TvSeries)} />
      )}
    </Grid>
  );
}

const LanguageMetadata = (details: Movie | TvSeries) => {
  if (isEmpty(details.spoken_languages)) {
    return 'N/A';
  }
  return details.spoken_languages.map((lang, idx) => {
    return (
      <span key={lang.iso_639_1}>
        {lang.name}
        {idx < details.spoken_languages.length - 1 && idx % 2 === 0 && '/'}
        {idx % 2 !== 0 && <br />}
      </span>
    );
  });
};

const MovieMetadata = (details: Movie) => {
  return (
    <>
      <div className={cx('metadata')}>
        <span className={cx('title')}>Length</span>
        <span className={cx('content')}>{details.runtime} min</span>
      </div>
      <div className={cx('metadata')}>
        <span className={cx('title')}>Language</span>
        <span className={cx('content')}>
          <LanguageMetadata {...details} />
        </span>
      </div>
      <div className={cx('metadata')}>
        <span className={cx('title')}>Release Date</span>
        <span className={cx('content')}>{details.release_date as string}</span>
      </div>
      <div className={cx('metadata')}>
        <span className={cx('title')}>Status</span>
        <span className={cx('content')}>{details.status || 'N/A'}</span>
      </div>
    </>
  );
};

const TvSeriesMetadata = (details: TvSeries) => {
  return (
    <>
      <div className={cx('metadata')}>
        <span className={cx('title')}>Language</span>
        <span className={cx('content')}>
          <LanguageMetadata {...details} />
        </span>
      </div>
      <div className={cx('metadata')}>
        <span className={cx('title')}>First Air</span>
        <span className={cx('content')}>{details.first_air_date as string} min</span>
      </div>
      <div className={cx('metadata')}>
        <span className={cx('title')}>Last Air</span>
        <span className={cx('content')}>{details.last_air_date as string}</span>
      </div>
      <div className={cx('metadata')}>
        <span className={cx('title')}>Status</span>
        <span className={cx('content')}>{details.status || 'N/A'}</span>
      </div>
    </>
  );
};
