import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimeAgoPipe } from 'time-ago-pipe';
import { AutosizeModule } from 'ngx-autosize';
import { MentionModule } from 'angular-mentions/mention';
import { SharedModule } from './../../shared/shared.module';
import { PostComponent } from './post/post.component';
import { PostListComponent } from './post-list/post-list.component';

@NgModule({
  declarations: [
    TimeAgoPipe,
    PostComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AutosizeModule,
    MentionModule,
    SharedModule
  ]
})
export class PostsModule { }
