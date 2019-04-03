import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';

import { EmployeeService } from './../../employees/shared/employee.service';
import { Employee } from './../../employees/shared/employee.model';
import { Post } from '../shared/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnChanges {

  @Input() post: Post;
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() edit: EventEmitter<Post> = new EventEmitter();
  @ViewChild('bodyTextArea') bodyTextArea: ElementRef;

  deleting: boolean;
  editing: boolean;
  bodyText: string;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.post && changes.post.currentValue) {
      // Store the post text, so we don't work directly with the post instance
      // and we can restore the old value if we cancel the edit
      this.bodyText = (changes.post.currentValue as Post).body;

      // Replace the @usernames for the custom HTML element with tooltip
      const usernames: string[] = this.bodyText.match(/\s([@][\w_-]+)/g);
      if (usernames && usernames.length > 0) {
        usernames.forEach(username => {
          const employee: Employee = this.employeeService.getEmployeeByUsername(username.split('@')[1]);
          if (employee) {
            this.bodyText = this.bodyText.replace(username, `<span class="text-info" data-toggle="tooltip"
            data-placement="top" title="${employee.name} - ${employee.role} (${employee.phone})">${username}</span>`);
          }
        });
      }

      // Replace the @phones for the custom HTML element with tooltip
      const phones: string[] = this.bodyText.match(/\s([#][\w_-]+)/g);
      if (phones && phones.length > 0) {
        phones.forEach(phone => {
          const employee: Employee = this.employeeService.getEmployeeByPhone(phone.split('#')[1]);
          if (employee) {
            this.bodyText = this.bodyText.replace(phone, `<span class="text-info" data-toggle="tooltip"
            data-placement="top" title="${employee.name} - ${employee.role} (${employee.phone})">${phone}</span>`);
          }
        });
      }

    }
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
    if (!this.editing) {
      this.editing = true;
      setTimeout(() => {
        this.bodyTextArea.nativeElement.focus();
      }, 10);
    }
  }

  onConfirmEdit() {
    this.editing = false;
    this.post.body = this.bodyText;
    this.edit.emit(this.post);
  }

  onCancelEdit() {
    this.editing = false;
    this.bodyText = this.post.body; // Restore the old value
  }

}
