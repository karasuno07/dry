import { http } from '@lib/http';
import Genre from '@model/Genres';
import { BASE_URL, buildAuthorizationHeader } from './utils';

type Genres = { genres: Genre[] };

export default class GenresService {
  static header = buildAuthorizationHeader();

  static getList() {
    return http('GET')<Genres>('/genre/movie/list', {
      baseURL: BASE_URL,
      headers: {
        Authorization: this.header,
      },
    });
  }
}
