import { Cast, Crew, Person } from '@model/People';
import { DiscoverType } from 'tmdb/api';
import BaseService from './base';

export type CreditsResponse = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

export const buildGetCreditsEndpoint = (type: DiscoverType, id: number) => `/${type}/${id}/credits`;
export const buildGetPersonDetailsEndpoint = (personId: number) => `/person/${personId}`;

export default class CreditsService extends BaseService {
  static getCredits(type: DiscoverType, id: number) {
    return this.http.get<CreditsResponse>(buildGetCreditsEndpoint(type, id));
  }

  static getPersonDetails(id: number) {
    return this.http.get<Person>(buildGetPersonDetailsEndpoint(id));
  }
}
