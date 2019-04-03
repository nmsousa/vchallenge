import { Injectable } from '@angular/core';

import { Post } from './post.model';
import { BaseEntityService } from 'src/app/shared/services/base-entity.service';

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseEntityService<Post> {

  constructor() {
    super();
  }

  protected localStorageKey(): string {
    return 'posts';
  }

  /**
   * Adds a new Post
   * @param body Post content text
   */
  public addPost(body: string): void {
    super.addRecord(new Post(null, body, new Date()));
  }

  /**
   * Order the posts by date descending
   * @param posts Posts to be ordered
   */
  protected sortRecords(posts: Post[]): Post[] {
    if (posts) {
      return posts.sort((a, b) => {
        return new Date(b.postDate).getTime() - new Date(a.postDate).getTime();
      });
    }

    return [];
  }

  public updatePostsEmployeeInfo(changedEmployeeFields: any) {
    const posts: Post[] = this.getAll();

    posts.map(post => {
      // @username has changed
      if (changedEmployeeFields.username.old) {
        if (post.body.includes(changedEmployeeFields.username.old)) {
          post.body = post.body.replace(changedEmployeeFields.username.old, changedEmployeeFields.username.new);
        }
      }
      // #phone has changed
      if (changedEmployeeFields.phone.old) {
        if (post.body.includes(changedEmployeeFields.phone.old)) {
          post.body = post.body.replace(changedEmployeeFields.phone.old, changedEmployeeFields.phone.new);
        }
      }
    });

    this.updateRecords(posts);

  }

}
