import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsChange = new Subject<Post[]>();

  constructor() { }

  /**
   * Gets the posts from the localStorage
   */
  getPosts(sort?: boolean): Post[] {
    return sort ?
      this.sortPostsByDate(JSON.parse(localStorage.getItem('posts')) || []) :
      JSON.parse(localStorage.getItem('posts')) || [];
  }

  /**
   * Update the localStorage Posts
   * @param posts Posts to save in the localStorage
   */
  private updatePosts(posts: Post[]): void {
    localStorage.setItem('posts', JSON.stringify(posts));
  }

  /**
   * Adds a new Post
   * @param body Post content text
   */
  addPost(body: string): void {
    const posts: Post[] = this.getPosts();

    // Adds a new post
    posts.push(new Post(this.getNextPostId(posts), new Date(), body));

    // Updates the localStorage with the new Post
    this.updatePosts(posts);

    // Inform whoever has a list of posts that there is a new list
    this.postsChange.next(this.sortPostsByDate(posts));
  }

  /**
   * Deleted a post by its Id
   * @param postId Identifies the Post to be deleted
   */
  deletePost(postId: number): void {
    // Get all the posts but the one we want to delete
    const posts: Post[] = this.getPosts().filter(post => {
      return post.id !== postId;
    });

    // Updates the localStorage with the list of the posts without the deleted one
    this.updatePosts(posts);

    // Inform whoever has a list of posts that there is a new list
    this.postsChange.next(this.sortPostsByDate(posts));
  }

  /**
   * Observable that will inform when the post list have been changed
   */
  getPostsChange(): Observable<Post[]> {
    return this.postsChange.asObservable();
  }

  /**
   * Gets the next available post Id based on the curent max + 1
   * @param posts List of posts to lookup for the next Id
   */
  private getNextPostId(posts: Post[]): number {
    if (posts) {
      return Math.max(...posts.map(post => post.id)) + 1;
    }

    return 1; // It's the first post
  }

  /**
   * Order the posts by date descending
   * @param posts Posts to be ordered
   */
  private sortPostsByDate(posts: Post[]): Post[] {
    if (posts) {
      return posts.sort((a, b) => {
        return new Date(b.postDate).getTime() - new Date(a.postDate).getTime();
      });
    }

    return [];
  }

}
