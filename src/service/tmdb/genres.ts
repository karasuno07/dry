import { CategoryResponse, Genre } from '@model/Categories';
import BaseService from './base';

type Genres = { genres: Genre[] };

export default class GenresService extends BaseService {
  static getMovieGenres() {
    return this.http.get<Genres>('/genre/movie/list', { revalidateSeconds: 84600 });
  }

  static getTvSeriesGenres() {
    return this.http.get<Genres>('/genre/tv/list', { revalidateSeconds: 84600 });
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
