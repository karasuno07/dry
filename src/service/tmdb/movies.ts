import { Image, ImageResponse } from '@model/Images';
import { toNumber } from 'lodash';
import { BackdropSize, ImageType, LogoSize, PosterSize } from 'tmdb/image';
import BaseService, { QueryParams } from './base';

export default class MoviesService extends BaseService {
  static getRecommendations(id: number, params?: QueryParams) {
    return this.http.get(`/movie/${id}/recommendations`, { params });
  }

  static getSimilarities(id: number, params?: QueryParams) {
    return this.http.get(`/movie/${id}/similar`, { params });
  }

  static async getImages(id: number, params?: Omit<QueryParams, 'page'>, type?: ImageType) {
    const response = this.http.get<ImageResponse>(`/movie/${id}/images`, { params });
    if (type === undefined) {
      return response;
    } else {
      const images = await response;
      return images[type];
    }
  }

  static async getBackdropImage(
    id: number,
    size: BackdropSize,
    params?: Omit<QueryParams, 'page'>
  ) {
    const backdrops = (await this.getImages(id, params, 'backdrops')) as Image[];
    return findImageBySize(backdrops, size);
  }

  static async getLogoImage(id: number, size: BackdropSize, params?: Omit<QueryParams, 'page'>) {
    const backdrops = (await this.getImages(id, params, 'logos')) as Image[];
    return findImageBySize(backdrops, size);
  }

  static async getPosterImage(id: number, size: BackdropSize, params?: Omit<QueryParams, 'page'>) {
    const backdrops = (await this.getImages(id, params, 'posters')) as Image[];
    return findImageBySize(backdrops, size);
  }
}

function findImageBySize(images: Image[], size: BackdropSize | LogoSize | PosterSize) {
  const compareSize = toNumber(size.substring(1));
  return images.find((image) => {
    if (size.startsWith('h')) {
      return image.height === compareSize;
    } else {
      return image.width === compareSize;
    }
  });
}
