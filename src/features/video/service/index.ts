import { Movie, TvSeries } from '@services/tmdb/model/Videos';
import TmdbVideoService from '@services/tmdb/videos';
import { LocaleType } from 'types/locale';
import { DiscoverType } from 'types/tmdb/api';

export async function getVideoDetails(type: DiscoverType, id: number, language: LocaleType = 'en') {
  const data = await TmdbVideoService.getDetails(type, id, {
    language: language,
  });

  return type === 'movie' ? (data as Movie) : (data as TvSeries);
}

const VideoService = {
  getDetails: getVideoDetails,
};

export default VideoService;
