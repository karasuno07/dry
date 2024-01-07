import { DiscoverType } from 'types/tmdb/api';

export type SupportedServer = 'Vidsrc.to' | 'Vidsrc.me' | 'Moviesapi.club' | 'Blackvid';

type LinkBuilderProps = {
  type?: DiscoverType;
  id?: number;
  imdbId?: string;
  seasonId?: number;
  episodeId?: number;
};

export type Server = {
  name: SupportedServer;
  link: (args: LinkBuilderProps) => string;
};

const servers: Server[] = [
  {
    name: 'Vidsrc.to',
    link({ type = 'movie', id, imdbId, seasonId = 1, episodeId = 1 }) {
      const baseUrl = 'https://vidsrc.to/embed/';
      if (type === 'movie') {
        return baseUrl + `${type}/${id || imdbId}?output=embed`;
      } else {
        return baseUrl + `${type}/${id || imdbId}/${seasonId}/${episodeId}?output=embed`;
      }
    },
  },
  {
    name: 'Vidsrc.me',
    link({ type = 'movie', id, imdbId, seasonId = 1, episodeId = 1 }) {
      let params = id ? `tmdb=${id}` : `imdb=${imdbId}`;
      if (type === 'tv') {
        params += `&season=${seasonId}&episode=${episodeId}&output=embed`;
      }
      return `https://vidsrc.me/embed/${type}?${params}`;
    },
  },
  {
    name: 'Blackvid',
    link({ id, type = 'movie', seasonId = 1, episodeId = 1 }) {
      let params = `output=embed&tmdb=${id}`;
      if (type === 'tv') {
        params += `&season=${seasonId}&episode=${episodeId}`;
      }
      return `https://blackvid.space/embed?${params}`;
    },
  },
];

export default servers;
