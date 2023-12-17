import { CategoryResponse, Genre } from '@model/Categories';
import BaseService from './base';

export type Genres = { genres: Genre[] };

export default class GenresService extends BaseService {
  static MOVIE_URL = '/genre/movie/list' as const;
  static TV_URL = '/genre/tv/list' as const;

  static getMovieGenres() {
    return this.http.get<Genres>(this.MOVIE_URL, { revalidateSeconds: 84600 });
  }

  static getTvSeriesGenres() {
    return this.http.get<Genres>(this.MOVIE_URL, { revalidateSeconds: 84600 });
  }

  static async getGenreBySlug(type: 'movie' | 'tv', slug: string) {
    let response: Genres;
    if (type === 'movie') {
      response = await this.getMovieGenres();
    } else {
      response = await this.getTvSeriesGenres();
    }

    return response.genres.find((genre) => {
      const category = new CategoryResponse(genre);
      return category.slug === slug;
    });
  }
}
