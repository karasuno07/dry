export const BASE_URL = 'https://api.themoviedb.org/3';

export function buildAuthorizationHeader(): string {
  const accessToken = process.env.TMDB_READ_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('Tmdb access token is invalid!');
  }
  return `Bearer ${accessToken}`;
}

export default class BaseService {
  static baseUrl = 'https://api.themoviedb.org/3';
  static header = buildAuthorizationHeader();
}
