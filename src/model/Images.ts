import { autoImplement } from '@lib/helper';

export type Image = {
  aspect_ratio: number;
  height: number;
  iso_639_1: string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

type ImageRawResponse = {
  id: number;
  backdrops: Image[];
  logos: Image[];
  posters: Image[];
};

export class ImageResponse extends autoImplement<ImageRawResponse>() {
  constructor(data: any) {
    super();
    this.id = data.id;
    this.backdrops = data.backdrops;
    this.logos = data.logos;
    this.posters = data.posters;
  }
}
