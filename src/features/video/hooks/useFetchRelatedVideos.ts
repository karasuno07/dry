import { VideoResponse } from '@model/Videos';
import { random, shuffle, union } from 'lodash';
import { use } from 'react';
import { DiscoverType } from 'types/tmdb/api';
import SearchService from '~/service/tmdb/search';
import VideoService from '~/service/tmdb/videos';

export default function useFetchRelatedVideos({ type, id }: { type: DiscoverType; id: number }) {
  const similariesPromise = VideoService.getSimilarities(type, id, { page: random(1, 500, false) });
  const recommendationsPromise = VideoService.getRecommendations(type, id, {
    page: random(1, 500, false),
  });

  const [similaries, recommendations] = use(
    Promise.all([similariesPromise, recommendationsPromise])
  );

  let data = union(similaries.results, recommendations.results);

  if (data.length === 0) {
    const { results } = use(SearchService.discover(type, { page: random(1, 500, false) }));
    data = results;
  }

  return shuffle(data)
    .slice(0, 6)
    .map((item) => new VideoResponse(item));
}
