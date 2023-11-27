import { autoImplement } from '@lib/helper';

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
  constructor(data: any) {
    super();
    this.id = data.id;
    this.title = data.title || data.name;
    this.original_language = data.original_language;
    this.original_title = data.original_title || data.original_name;
    this.genre_ids = data.genre_ids;
    this.overview = data.overview;
    this.adult = data.adult;
    this.backdrop_path = data.backdrop_path;
    this.poster_path = data.poster_path;
    this.popularity = data.popularity;
    this.release_date = data.release_date;
    this.first_air_date = data.first_air_date;
    this.vote_average = data.vote_average;
    this.vote_count = data.vote_count;
  }
}
