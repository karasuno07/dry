import { PaginationDiscoverVideos, VideoResponse } from '@model/Videos';
import useSWR from 'swr';
import { DiscoverParams, DiscoverType, SearchParams, SortParams } from 'types/tmdb/api';
import SearchService from '~/service/tmdb/search';
import useGetGenreBySlug from './useGetGenreBySlug';

type HookProps = {
  type: DiscoverType;
  categorySlug: string;
  params: SearchParams & SortParams & DiscoverParams;
};

export default function useSearchVideos({ type, categorySlug, params }: HookProps) {
  const { genre } = useGetGenreBySlug(type, categorySlug);

  const { data, error, isLoading } = useSWR<PaginationDiscoverVideos>(
    SearchService.buildDiscoverURL(type),
    (url) =>
      SearchService.http.get(url, {
        params: { ...params, with_genres: genre?.id.toString() || undefined },
      })
  );

  return {
    videos: data?.results.map((result) => new VideoResponse(result)),
    totalPages: data?.total_pages,
    error,
    isLoading,
  };
}
