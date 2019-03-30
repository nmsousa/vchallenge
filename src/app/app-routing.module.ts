import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './pages/posts/post-list/post-list.component';
import { EmployeeListComponent } from './pages/employees/employee-list/employee-list.component';

const routes: Routes = [
  { path: 'posts', component: PostListComponent },
  { path: 'admin', component: EmployeeListComponent },
  { path: '**', redirectTo: 'posts' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
