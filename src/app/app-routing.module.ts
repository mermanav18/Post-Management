import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostsListComponent } from './posts-list/posts-list.component';

const routes: Routes = [
  {
    path:'',
    pathMatch: 'full',
    component: PostsListComponent
  },
  {
    path: 'posts-list',
    component: PostsListComponent
  },
  {
    path:'post-detail',
    component: PostDetailComponent
  },
  { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
