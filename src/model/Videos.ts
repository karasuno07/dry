import { autoImplement } from '@lib/helper';
import { UTILS } from '~/service/tmdb/base';

export type DiscoverVideo = {
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  overview: string;
  adult: boolean;
  backdrop_path: string;
  poster_path: string;
  popularity: number;
  release_date: string | Date;
  first_air_date: string | Date;
  vote_average: number;
  vote_count: number;
};

export class VideoResponse extends autoImplement<DiscoverVideo>() {
  backdrop_url: string;
  poster_url: string;

  constructor(data: any) {
    super();
    this.id = data.id;
    this.title = data.title;
    this.original_language = data.original_language;
    this.original_title = data.original_title;
    this.genre_ids = data.genre_ids;
    this.overview = data.overview;
    this.adult = data.adult;
    this.backdrop_url = UTILS.buildImageUrl(data.backdrop_path, 'original');
    this.poster_url = UTILS.buildImageUrl(data.poster_path, 'original');
    this.popularity = data.popularity;
    this.release_date = data.release_date;
    this.first_air_date = data.first_air_date;
    this.vote_average = data.vote_average;
    this.vote_count = data.vote_count;
  }
}
