import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalRoutingModule } from './modal-routing.module';
import { ModalComponent } from './modal.component';

import {MaterialModule} from './../../../material.module';


import { EditPostModule} from '../../../components/posts/edit-post/edit-post.module';

import { NewPostModule} from '../../../components/posts/new-post/new-post.module';



@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    ModalRoutingModule,
    MaterialModule,
    EditPostModule,
    NewPostModule,
  ]
})
export class ModalModule { }
