import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UserI } from '../shared/models/user.interface';
import { PostI } from '../shared/models/post.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewPostComponent } from '../components/posts/new-post/new-post.component'

@Component({
  selector: 'app-new-worker',
  templateUrl: './new-worker.component.html',
  styleUrls: ['./new-worker.component.scss'],
})
export class NewWorkerComponent implements OnInit {

  constructor(private router: Router,public dialog: MatDialog,private authService: AuthService,private afs: AngularFirestore,private authSvc: AuthService) { }

  public email: string = '';
  public password: string = '';
  public nombre: string = '';


  ngOnInit(): void {

  }

  onAddUser(email: string, pass: string){
    return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    .then(userData => {
      resolve(userData),
      this.authService.updateUserDataWorker(userData.user,this.nombre)
    }).catch(err => console.log(reject(err)))
  });
}


  //----------------------------------------------------------------
  public profileForm = new FormGroup({
    emailEmpresa: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  private initValuesForm(user: UserI): void {
    this.profileForm.patchValue({
      emailEmpresa: user.email
    });
  }
}
