import { Cast, Crew, Person } from '@services/tmdb/model/People';
import { DiscoverType } from 'types/tmdb/api';
import BaseService from './base';

export type CreditsResponse = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

export const buildGetCreditsEndpoint = (type: DiscoverType, id: number) => `/${type}/${id}/credits`;
export const buildGetPersonDetailsEndpoint = (personId: number) => `/person/${personId}`;

export default class CreditsService extends BaseService {
  static async getCredits(type: DiscoverType, id: number) {
    return this.get<CreditsResponse>(buildGetCreditsEndpoint(type, id));
  }

  static async getPersonDetails(id: number) {
    return this.get<Person>(buildGetPersonDetailsEndpoint(id));
  }
}
