import { http } from '@lib/http';
import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

function buildAuthorizationHeader(): string {
  const accessToken = process.env.TMDB_READ_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('Tmdb access token is invalid!');
  }
  return `Bearer ${accessToken}`;
}

export default class BaseService {
  static http = http(
    axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: buildAuthorizationHeader(),
      },
    })
  );
}
