import { Image, ImageResponse } from '@model/Images';
import { VideoDetails } from '@model/Videos';
import { DiscoverType, LanguageParams, QueryParams } from 'tmdb/api';
import { BackdropSize, ImageType } from 'tmdb/image';
import BaseService, { UTILS } from './base';

export default class VideoService extends BaseService {
  static getDetails(type: DiscoverType, id: number, params?: LanguageParams) {
    return this.http.get<VideoDetails>(`/${type}/${id}`, { params });
  }

  static getRecommendations(type: DiscoverType, id: number, params?: QueryParams) {
    return this.http.get(`/${type}/${id}/recommendations`, { params });
  }

  static getSimilarities(type: DiscoverType, id: number, params?: QueryParams) {
    return this.http.get(`/${type}/${id}/similar`, { params });
  }

  static async getImages(
    type: DiscoverType,
    id: number,
    params?: Omit<QueryParams, 'page'>,
    imageType?: ImageType
  ) {
    const response = this.http.get<ImageResponse>(`/${type}/${id}/images`, { params });
    if (imageType === undefined) {
      return response;
    } else {
      const images = await response;
      return images[imageType];
    }
  }

  static async getBackdropImage(
    type: DiscoverType,
    id: number,
    size: BackdropSize,
    params?: Omit<QueryParams, 'page'>
  ) {
    const backdrops = (await this.getImages(type, id, params, 'backdrops')) as Image[];
    return UTILS.findImageBySize(backdrops, size);
  }

  static async getLogoImage(
    type: DiscoverType,
    id: number,
    size: BackdropSize,
    params?: Omit<QueryParams, 'page'>
  ) {
    const backdrops = (await this.getImages(type, id, params, 'logos')) as Image[];
    return UTILS.findImageBySize(backdrops, size);
  }

  static async getPosterImage(
    type: DiscoverType,
    id: number,
    size: BackdropSize,
    params?: Omit<QueryParams, 'page'>
  ) {
    const backdrops = (await this.getImages(type, id, params, 'posters')) as Image[];
    return UTILS.findImageBySize(backdrops, size);
  }
}
