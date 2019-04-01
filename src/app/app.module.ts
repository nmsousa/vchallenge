import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { EmployeesModule } from './pages/employees/employees.module';
import { PostsModule } from './pages/posts/posts.module';
import { AlertMessageComponent } from './shared/components/alert-message/alert-message.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EmployeesModule,
    PostsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
