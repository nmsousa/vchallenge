import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimeAgoPipe } from 'time-ago-pipe';
import { AutosizeModule } from 'ngx-autosize';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';
import { ModalConfirmationComponent } from './../../shared/components/modal-confirmation/modal-confirmation.component';
import { AlertMessageComponent } from './../../shared/components/alert-message/alert-message.component';

@NgModule({
  declarations: [
    TimeAgoPipe,
    PostComponent,
    PostListComponent,
    ModalConfirmationComponent,
    AlertMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AutosizeModule
  ]
})
export class PostsModule { }
