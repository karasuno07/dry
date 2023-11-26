import { DiscoverVideo } from '@model/Videos';
import { DiscoverType, PaginationResponse, SearchParams, SearchType, SortParams } from 'tmdb/api';
import BaseService from './base';

export type SearchResponse = PaginationResponse<DiscoverVideo>;

export default class SearchService extends BaseService {
  static search(type: SearchType, params: SearchParams & SortParams) {
    return this.http.get<SearchResponse>(`search/${type}`, { params });
  }
  static discover(type: DiscoverType, params: SearchParams & SortParams) {
    return this.http.get<SearchResponse>(`/discover/${type}`, { params });
  }
}
