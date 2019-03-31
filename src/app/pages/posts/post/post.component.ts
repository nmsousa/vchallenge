import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Post } from '../shared/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() edit: EventEmitter<Post> = new EventEmitter();
  @ViewChild('bodyTextArea') bodyTextArea: ElementRef;

  deleting: boolean;
  editing: boolean;

  constructor() { }

  ngOnInit() {
  }

  deletePost() {
    this.delete.emit(this.post.id);
  }

  // Only posts that are less than 5 secs are considered new
  isNewPost(post: Post) {
    // Not so efficient, but cool feature :)
    return Math.round(Math.abs(((new Date()).getTime() - new Date(post.postDate).getTime()) / 1000)) < 5;
  }

  startEditPost() {
    this.editing = true;
    setTimeout(() => {
      this.bodyTextArea.nativeElement.focus();
    }, 10);
  }

  endEditPost() {
    this.editing = false;
    this.edit.emit(this.post);
  }

}
