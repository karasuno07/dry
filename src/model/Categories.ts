import { autoImplement } from '@lib/helper';

export type Genre = {
  id: string;
  name: string;
};

type Category = {
  slug: string;
} & Genre;

export class CategoryResponse extends autoImplement<Category>() {
  private generateSlug() {
    return this.name.replace(/\s/g, '-').toLowerCase();
  }

  constructor(category: any) {
    super();
    this.id = category.id;
    this.name = category.name;
    this.slug = category.slug || this.generateSlug();
  }
}
