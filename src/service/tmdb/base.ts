import { http } from '@lib/http';
import { Image } from '@model/Images';
import axios from 'axios';
import { toNumber } from 'lodash';
import { BackdropSize, LogoSize, PosterSize } from 'tmdb/image';
import { LocaleType } from '~/constants/locales';

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

  static findImageBySize(images: Image[], size: BackdropSize | LogoSize | PosterSize) {
    const compareSize = toNumber(size.substring(1));
    return images.find((image) => {
      if (size.startsWith('h')) {
        return image.height === compareSize;
      } else {
        return image.width === compareSize;
      }
    });
  }
}

export type QueryParams = {
  language?: LocaleType;
  page?: number;
};

export type SearchParams = {
  query?: string;
  include_adult?: boolean;
  primary_release_year?: number;
  first_air_date_year?: number;
  region?: string;
  year?: number;
} & QueryParams;

export type PaginationPayload<T = any> = {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
};

export const UTILS = {
  findImageBySize(images: Image[], size: BackdropSize | LogoSize | PosterSize) {
    const compareSize = toNumber(size.substring(1));
    return images.find((image) => {
      if (size.startsWith('h')) {
        return image.height === compareSize;
      } else {
        return image.width === compareSize;
      }
    });
  },
};