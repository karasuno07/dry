import { Image, ImageResponse } from '@model/Images';
import { PaginationDiscoverVideos, VideoDetails } from '@model/Videos';
import { DiscoverType, LanguageParams, QueryParams } from 'types/tmdb/api';
import { BackdropSize, ImageType } from 'types/tmdb/image';
import BaseService, { UTILS } from './base';

export default class VideoService extends BaseService {
  static getDetails(type: DiscoverType, id: number, params?: LanguageParams) {
    return this.get<VideoDetails>(`/${type}/${id}`, { params });
  }

  static getRecommendations(type: DiscoverType, id: number, params?: QueryParams) {
    return this.get<PaginationDiscoverVideos>(`/${type}/${id}/recommendations`, { params });
  }

  static getSimilarities(type: DiscoverType, id: number, params?: QueryParams) {
    return this.get<PaginationDiscoverVideos>(`/${type}/${id}/similar`, { params });
  }

  static async getImages(
    type: DiscoverType,
    id: number,
    params?: Omit<QueryParams, 'page'>,
    imageType?: ImageType
  ) {
    const data = await this.get<ImageResponse>(`/${type}/${id}/images`, { params });
    if (imageType === undefined) {
      return data;
    } else {
      return data && data[imageType];
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
