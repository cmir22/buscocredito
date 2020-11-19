import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeUserComponent } from './home-user.component';

const routes: Routes = [{ /*path: 'homeUser', component: HomeUserComponent*/ }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeUserRoutingModule { }
