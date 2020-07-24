import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeUserRoutingModule } from './home-user-routing.module';
import { HomeUserComponent } from './home-user.component';

import { MaterialModule} from '../../../material.module'



@NgModule({
  declarations: [HomeUserComponent],
  imports: [
    CommonModule,
    HomeUserRoutingModule,
    MaterialModule,
  ]
})
export class HomeUserModule {

 }
