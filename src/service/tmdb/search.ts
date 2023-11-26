import BaseService, { SearchParams } from './base';

type SearchType = 'collection' | 'movie' | 'tv' | 'person' | 'company' | 'keyword' | 'multi';

export default class SearchService extends BaseService {
  static search(type: SearchType, params: SearchParams) {
    return this.http.get(`/search/${type}`, { params });
  }
}
