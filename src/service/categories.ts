import { CategoryResponse } from '@features/home/model/Categories';
import { http } from '@lib/http';

export default class CategoryService {
  static async getCategories() {
    return await http('GET')<CategoryResponse[]>('/api/videos/categories');
  }
}
