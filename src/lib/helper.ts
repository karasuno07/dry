import { forEach } from 'lodash';
import { getPlaiceholder } from 'plaiceholder';
import { HttpClientError } from 'types/api';
import { ValidationSchema } from 'types/validation';
import { http } from './http';

export function autoImplement<T>(defaults?: Partial<T>) {
  return class {
    constructor() {
      Object.assign(this, defaults || {});
    }
  } as new () => T;
}

export class ModelVaidation<T extends object> {
  schema?: ValidationSchema;

  constructor(config?: { schema?: ValidationSchema }) {
    this.schema = config?.schema;
  }

  validate(obj: object, refObj: T) {
    const model = obj as any satisfies T;

    const objFields = Object.keys(obj);
    const refObjFields = new Set(Object.keys(refObj));

    const unknownFields: string[] = [];
    const missingFields: string[] = [];

    for (const field of objFields) {
      if (!refObjFields.has(field)) {
        unknownFields.push(field);
      }
    }

    if (unknownFields.length > 0) {
      const cause = `Field${unknownFields.length > 1 ? 's' : ''} [${unknownFields.join(', ')}] ${
        unknownFields.length > 1 ? 'are' : 'is'
      } not defined in the  model schema.`;
      throw HttpClientError.badClient('Field validation error.', cause);
    }

    if (this.schema?.required && this.schema.required.length > 0) {
      forEach(this.schema.required, (field) => {
        if (!objFields.includes(field)) {
          missingFields.push(field);
        }
      });

      if (missingFields.length > 0) {
        const cause = `Field${missingFields.length > 1 ? 's' : ''} [${missingFields.join(', ')}] ${
          missingFields.length > 1 ? 'are' : 'is'
        } required but not appear in the model schema.`;
        throw HttpClientError.badClient('Field validation error.', cause);
      }
    }

    return model;
  }
}

export async function generatePlaceholderImage(src: string) {
  const response = await http().get(src, { responseType: 'arraybuffer' });
  console.log(src);
  const buffer = Buffer.from(response.data);

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10, format: ['webp'] });

  return {
    img: { src, width, height },
    ...plaiceholder,
  };
}
