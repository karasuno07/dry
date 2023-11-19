import { Genre } from '@model/Categories';
import BaseService from './base';

type Genres = { genres: Genre[] };

export default class GenresService extends BaseService {
  static getList() {
    return this.http.get<Genres>('/genre/movie/list');
  }
}
