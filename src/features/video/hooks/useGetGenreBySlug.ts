import { CategoryResponse } from '@model/Categories';
import useSWR from 'swr';
import { DiscoverType } from 'types/tmdb/api';
import GenresService, { Genres } from '~/service/tmdb/genres';

export default function useGetGenreBySlug(type: DiscoverType, slug: string) {
  const fetchUrl: string = type === 'movie' ? GenresService.MOVIE_URL : GenresService.TV_URL;
  const { data, error, isLoading } = useSWR<Genres>(fetchUrl, (url) => GenresService.http.get(url));

  return {
    genre: data?.genres.find((genre) => new CategoryResponse(genre).slug === slug),
    error,
    isLoading,
  };
}
