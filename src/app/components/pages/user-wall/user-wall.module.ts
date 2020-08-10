import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserWallRoutingModule } from './user-wall-routing.module';
import { UserWallComponent } from './user-wall.component';
import { MaterialModule} from '../../../material.module'
import { ProfileComponent} from '../../admin/profile/profile.component'


@NgModule({
  declarations: [UserWallComponent],
  imports: [
    CommonModule,
    UserWallRoutingModule,
    MaterialModule,
    
  ]
})
export class UserWallModule { }
