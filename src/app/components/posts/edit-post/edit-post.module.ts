import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPostRoutingModule } from './edit-post-routing.module';
import { EditPostComponent } from './edit-post.component';

import { MaterialModule } from '../../../material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [EditPostComponent],
  imports: [
    CommonModule,
    EditPostRoutingModule,
    MaterialModule,
  ],

  exports:[EditPostComponent]
})
export class EditPostModule { }
