import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[];
  private postsChange = new Subject<any>();

  constructor() {
    this.posts = JSON.parse(localStorage.getItem('posts')) || [];
  }

  getPosts(): Post[] {
    return this.posts;
  }

  updatePosts(): void {
    localStorage.setItem('posts', JSON.stringify(this.posts));
  }

  addPost(body: string): void {
    this.posts.unshift(new Post(this.posts.length + 1, new Date(), body));

    // Updates the localStorage with the new Post
    this.updatePosts();
  }

  deletePost(postIndex: number): void {
    this.posts.splice(postIndex, 1);

    // Updates the localStorage with the new Post
    this.updatePosts();
  }

  getPostsChange(): Observable<any> {
    return this.postsChange.asObservable();
  }

}
