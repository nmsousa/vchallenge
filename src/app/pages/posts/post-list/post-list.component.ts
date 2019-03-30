import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Post } from './../shared/post.model';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[];
  newPostBody: string;
  subscription: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts = this.postService.getPosts();
  }

  addPost() {
    this.postService.addPost(this.newPostBody);
    this.newPostBody = '';

    // TODO: Isto deve ser um subscribe
    this.posts = this.postService.getPosts();
  }

  deletePost(postIndex: number) {
    this.postService.deletePost(postIndex);

    // TODO: Isto deve ser um subscribe
    this.posts = this.postService.getPosts();
  }

  ngOnDestroy() {
    // To prevent memory leaks
    this.subscription.unsubscribe();
  }

}
