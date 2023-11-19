import BaseService from './base';

export default class MoviesService extends BaseService {
  static getRecommendations(videoId: number) {
    return this.http.get(`/movie/${videoId}/recommendations`);
  }
}
