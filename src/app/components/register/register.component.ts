import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import {  AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { UserI } from '../../shared/models/user.interface';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,private authService: AuthService,private afs: AngularFirestore) { }

  public email: string = '';
  public password: string = '';
  public rol: boolean = true;

  ngOnInit(): void {
  }

  onAddUser(email: string, pass: string){
    return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    .then(userData => {
      resolve(userData),
      this.authService.updateUserData(userData.user)
      this.router.navigate([`/homeUser`]);
    }).catch(err => console.log(reject(err)))
  });

    /*
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
    this.authService.registerUser(this.email,this.password)
    .then((res) => {
      this.router.navigate([`/homeUser`]);
    }).catch(err => console.log('err', err.message))
    */
  
}





}
