import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Post } from './../shared/post.model';
import { PostService } from '../shared/post.service';
import { EmployeeService } from './../../employees/shared/employee.service';
import { AlertService } from './../../../shared/components/alert-message/alert.service';

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
  employeeNames: string[];
  employeePhones: string[];
  mentionConfig = {};

  constructor(
    private postService: PostService,
    private employeeService: EmployeeService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.posts = this.postService.getAll(true);
    this.employeeNames = this.employeeService.getEmployeeNames();
    this.employeePhones = this.employeeService.getEmployeePhones();

    // Listen to Post list changes
    this.subscription = this.postService.getRecordsChange().subscribe(posts => {
      this.posts = posts;
    });

    // Setup the configuration for the mentions Post textarea
    this.mentionConfig = {
      mentions: [
        {
          items: this.employeeNames,
          triggerChar: '@'
        },
        {
          items: this.employeePhones,
          triggerChar: '#'
        },
      ]
    };
  }

  addPost() {
    this.postService.addPost(this.newPostBody);
    this.newPostBody = '';
    this.alertService.showMessage('Your post was published with success!');
  }

  deletePost(postId: number) {
    this.postService.deleteRecord(postId);
    this.alertService.showMessage('Your post was deleted with success!');
  }

  editPost(post: Post) {
    this.postService.editRecord(post);
    this.alertService.showMessage('Your post was edited with success!');
  }

  ngOnDestroy() {
    // To prevent memory leaks
    this.subscription.unsubscribe();
  }

}
