import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Post } from '../shared/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post: Post;

  @Output() delete: EventEmitter<number> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  deletePost() {
    this.delete.emit(this.post.id);
  }

}
