import { BaseEntityModel } from 'src/app/shared/models/base-entity.model';

/**
 * This class represents a Post
 */
export class Post extends BaseEntityModel {

  constructor(
    public id?: number,
    public body?: string,
    public postDate?: Date,
  ) {

      super();
  }

}
