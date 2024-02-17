import { RequestConfig, http } from '@lib/http';
import { Image } from '@services/tmdb/model/Images';
import { BackdropSize, LogoSize, PosterSize } from 'types/tmdb/image';

export const BASE_URL = 'https://api.themoviedb.org/3';

function buildAuthorizationHeader(): string {
  const accessToken = process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('Tmdb access token is invalid!');
  }
  return `Bearer ${accessToken}`;
}

export default class BaseService {
  static async get<T = any>(url: string, config?: RequestConfig) {
    const response = await http({
      baseURL: BASE_URL,
      headers: {
        Authorization: buildAuthorizationHeader(),
      },
    }).get<T>(url, config);
    return response.data;
  }
}

export const UTILS = {
  findImageBySize(images: Image[], size: BackdropSize | LogoSize | PosterSize) {
    const compareSize = Number(size.substring(1));
    return images.find((image) => {
      if (size.startsWith('h')) {
        return image.height === compareSize;
      } else {
        return image.width === compareSize;
      }
    });
  },
  buildImageUrl(
    path: string,
    size: BackdropSize | LogoSize | PosterSize | 'original' = 'original'
  ) {
    if (path == null) {
      return '';
    }
    return `https://image.tmdb.org/t/p/${size}${path}`;
  },
};
