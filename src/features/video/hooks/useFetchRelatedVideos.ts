import { VideoResponse } from '@model/Videos';
import { random } from 'lodash';
import { use } from 'react';
import { DiscoverType } from 'tmdb/api';
import VideoService from '~/service/tmdb/videos';

export default function useFetchRelatedVideos({ type, id }: { type: DiscoverType; id: number }) {
  const randomPage = random(1, 5, false);
  const { results } = use(VideoService.getSimilarities(type, id, { page: randomPage }));
  if (results.length > 0) {
    return results.map((item) => new VideoResponse(item));
  } else {
    const { results } = use(VideoService.getRecommendations(type, id, { page: randomPage }));
    return results.map((item) => new VideoResponse(item));
  }
}
