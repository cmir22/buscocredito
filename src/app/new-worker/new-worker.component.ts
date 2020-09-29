import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {  AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-new-worker',
  templateUrl: './new-worker.component.html',
  styleUrls: ['./new-worker.component.scss']
})
export class NewWorkerComponent implements OnInit {

  constructor(private router: Router,private authService: AuthService,private afs: AngularFirestore) { }

  public email: string = '';
  public password: string = '';

  ngOnInit(): void {
  }



  onAddUser(email: string, pass: string){
    return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    .then(userData => {
      resolve(userData),
      this.authService.updateUserDataWorker(userData.user)
    }).catch(err => console.log(reject(err)))
  });
}



}
