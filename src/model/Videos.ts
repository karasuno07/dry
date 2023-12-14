import { autoImplement } from '@lib/helper';
import { PaginationResponse } from 'tmdb/api';
import { Genre } from './Categories';

type Season = {
  id: number;
  name: string;
  season_number: number;
  overview: string;
  episode_count: number;
  air_date: Date | string;
  poster_path: string;
  vote_average: number;
};

type Episode = {
  id: number;
  name: string;
  episode_number: number;
  episode_type: string;
  season_number: number;
  show_id: number;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: Date | string;
  still_path: string;
};

type Video = {
  id: number;
  original_language: string;
  overview: string;
  genres: Genre[];
  adult: boolean;
  backdrop_path: string;
  poster_path: string;
  popularity: number;
  spoken_languages: {
    iso_639_1: string;
    english_name: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  vote_average: number;
  vote_count: number;
};

export type Movie = Video & {
  title: string;
  original_title: string;
  runtime: number;
  release_date: Date | string;
};

export type TvSeries = Video & {
  name: string;
  original_name: string;
  origin_country: string[];
  first_air_date: Date | string;
  last_air_date: Date | string | undefined;
  number_of_episodes: number;
  number_of_seasons: number;
  last_episode_to_air: Episode;
  next_episode_to_air: Episode;
  seasons: Season[];
};

export type VideoDetails = Movie | TvSeries;

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

export type PaginationDiscoverVideos = PaginationResponse<DiscoverVideo>;

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
