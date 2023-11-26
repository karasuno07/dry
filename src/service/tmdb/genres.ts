import { Genre } from '@model/Categories';
import BaseService from './base';

type Genres = { genres: Genre[] };

export default class GenresService extends BaseService {
  static getMovieGenres() {
    return this.http.get<Genres>('/genre/movie/list');
  }

  static getTvSeriesGenres() {
    return this.http.get<Genres>('/genre/tv/list');
  }
}
