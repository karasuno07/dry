import { random, shuffle, union } from '@lib/object';
import { use } from 'react';
import { DiscoverType } from 'types/tmdb/api';
import { VideoResponse } from '~/service/tmdb/model/Videos';
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

  let results = union(similaries?.results, recommendations?.results);

  if (results.length === 0) {
    const data = use(SearchService.discover(type, { page: random(1, 500, false) }));
    results = data?.results || [];
  }

  return [...shuffle(results)].slice(0, 6).map((item) => new VideoResponse(item));
}
