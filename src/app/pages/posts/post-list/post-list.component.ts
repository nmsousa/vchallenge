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

  subscription: Subscription;
  posts: Post[];
  newPostBody: string;
  alertMessage: string;
  showAlert: boolean;
  deleting: boolean;
  timer: ReturnType<typeof setTimeout>;

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
    this.showTimedAlert('Your post was published with success!');
  }

  deletePost(postId: number) {
    this.postService.deletePost(postId);
    this.showTimedAlert('Your post was deleted with success!');
  }

  editPost(post: Post) {
    this.postService.editPost(post);
    this.showTimedAlert('Your post was edited with success!');
  }

  showTimedAlert(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
    // Stop the timer is it's already running
    if (this.timer) {
      clearTimeout(this.timer);
    }
    // Closes after 4 secs
    this.timer = setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  ngOnDestroy() {
    // To prevent memory leaks
    this.subscription.unsubscribe();
  }

}
