import { CategoryResponse, Genre } from '@services/tmdb/model/Categories';
import BaseService from './base';

export type Genres = { genres: Genre[] };

export default class GenresService extends BaseService {
  static MOVIE_URL = '/genre/movie/list' as const;
  static TV_URL = '/genre/tv/list' as const;

  static getMovieGenres() {
    return this.get<Genres>(this.MOVIE_URL, { next: { revalidate: 84600 } });
  }

  static getTvSeriesGenres() {
    return this.get<Genres>(this.TV_URL, { next: { revalidate: 84600 } });
  }

  static async getGenreBySlug(type: 'movie' | 'tv', slug: string) {
    let data;
    if (type === 'movie') {
      data = await this.getMovieGenres();
    } else {
      data = await this.getTvSeriesGenres();
    }

    return data?.genres.find((genre) => {
      const category = new CategoryResponse(genre);
      return category.slug === slug;
    });
  }
}
