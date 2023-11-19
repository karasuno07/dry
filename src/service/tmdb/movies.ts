import { http } from '@lib/http';
import BaseService from './utils';

export default class MoviesService extends BaseService {
  static getRecommendations(videoId: number) {
    return http('GET')(`/movie/${videoId}/recommendations`, {
      baseURL: this.baseUrl,
      headers: {
        Authorization: this.header,
      },
    });
  }
}
