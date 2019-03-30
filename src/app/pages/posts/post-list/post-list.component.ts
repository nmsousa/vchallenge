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
    // The the Posts
    this.posts = this.postService.getPosts(true);

    this.postService.getPostsChange().subscribe(posts => {
      this.posts = posts;
    });
  }

  addPost() {
    this.postService.addPost(this.newPostBody);
    this.newPostBody = '';
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId);
  }

  ngOnDestroy() {
    // To prevent memory leaks
    this.subscription.unsubscribe();
  }

}
