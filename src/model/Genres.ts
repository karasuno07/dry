import { autoImplement } from '@lib/helper';

interface IGenre {
  id: string;
  name: string;
  slug: string;
}

export default class Genre extends autoImplement<IGenre>() {
  private generateSlug() {
    return this.name.replace(/\s/g, '-').toLowerCase();
  }

  constructor(category: any) {
    super();
    this.id = category.id;
    this.name = category.name;
    this.slug = this.generateSlug();
  }
}
