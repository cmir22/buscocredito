import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserI } from '../../../shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})




export class NewPostComponent implements OnInit {

  detector = "";

  public newPostForm = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  setData() {
    this.db.collection('informacion').doc().set({
      
    })
  }

  constructor(private authSvc: AuthService, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.authSvc.userData$.subscribe(user => {
      this.initValuesForm(user);
    });
  }

  private initValuesForm(user): void {
    this.newPostForm.patchValue({
      email: user.email,
    });
  }




}
