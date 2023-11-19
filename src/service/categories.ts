import { http } from '@lib/http';
import { CategoryResponse } from '@model/Categories';

export default class CategoryService {
  static async getCategories() {
    return await http().get<CategoryResponse[]>('/api/videos/categories');
  }
}
