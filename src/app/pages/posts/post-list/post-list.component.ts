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
  showAlert: boolean;
  deleting: boolean;

  constructor(private postService: PostService) { }

  ngOnInit() {
    // Get the Posts
    this.posts = this.postService.getPosts(true);

    // Listen to Post list changes
    this.postService.getPostsChange().subscribe(posts => {
      this.posts = posts;
    });
  }

  addPost() {
    this.postService.addPost(this.newPostBody);
    this.newPostBody = '';
    this.showAlert = true;
    // Closes after 5 secs
    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId);
  }

  closeAlert() {
    this.showAlert = false;
  }

  ngOnDestroy() {
    // To prevent memory leaks
    this.subscription.unsubscribe();
  }

}
