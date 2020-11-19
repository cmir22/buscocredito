import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
<<<<<<< HEAD
import { UserI } from '../shared/models/user.interface';
import { PostI } from '../shared/models/post.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewPostComponent } from '../components/posts/new-post/new-post.component'
=======
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserI } from 'src/app/shared/models/user.interface';
>>>>>>> 625590f3c069fde936a7cb00857d9c0e248fa499

@Component({
  selector: 'app-new-worker',
  templateUrl: './new-worker.component.html',
  styleUrls: ['./new-worker.component.scss'],
})
export class NewWorkerComponent implements OnInit {
<<<<<<< HEAD

  constructor(private router: Router,public dialog: MatDialog,private authService: AuthService,private afs: AngularFirestore,private authSvc: AuthService) { }
=======
  constructor(
    private router: Router,
    private authService: AuthService,
    private afs: AngularFirestore
  ) {}
>>>>>>> 625590f3c069fde936a7cb00857d9c0e248fa499

  public email: string = '';
  public password: string = '';
  public nombre: string = '';

<<<<<<< HEAD

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

=======

  ngOnInit(): void {
    this.authService.userData$.subscribe((user) => {
      this.initValuesForm(user);
    });
  }

  onAddUser(email: string, pass: string,emailEmpresa) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userData) => {
          resolve(userData),
          console.log("Entro")
            this.authService.updateUserDataWorker(userData.user,emailEmpresa);
        })
        .catch((err) => console.log(reject(err)));
    });
  }
>>>>>>> 625590f3c069fde936a7cb00857d9c0e248fa499

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
