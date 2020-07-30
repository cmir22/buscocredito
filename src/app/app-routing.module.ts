import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PostComponent } from './components/posts/post/post.component';

import { RegisterComponent } from './components/register/register.component'



const routes: Routes = [


  // USE CHILDREN
  { path: '', redirectTo: '/login', pathMatch: 'full' },

 // { path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) },
  { path: 'post/:id', component: PostComponent },
  { path: 'about', loadChildren: () => import('./components/pages/about/about.module').then(m => m.AboutModule) },

 // { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) },

  { path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) },

  { path: 'homeUser', loadChildren: () => import('./components/pages/home-user/home-user.module').then(m => m.HomeUserModule) },


  { path: 'profile', loadChildren: () => import('./components/admin/profile/profile.module').then(m => m.ProfileModule) },


  { path: 'edit-post', loadChildren: () => import('./components/posts/edit-post/edit-post.module').then(m => m.EditPostModule) },


  { path: 'modal', loadChildren: () => import('./shared/component/modal/modal.module').then(m => m.ModalModule) },

  { path: 'register', component: RegisterComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
