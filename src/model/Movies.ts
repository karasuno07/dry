import { Genre } from './Categories';

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: object | null; // TODO: build collection dto;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string | Date;
  revenue: number;
  runtime: number;
  spoken_languages: {
    name: string;
    iso_639_1: string;
    english_name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
