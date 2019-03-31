import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimeAgoPipe } from 'time-ago-pipe';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { ModalConfirmationComponent } from './../../shared/components/modal-confirmation/modal-confirmation.component';

@NgModule({
  declarations: [
    TimeAgoPipe,
    PostComponent,
    PostListComponent,
    ModalConfirmationComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PostsModule { }
