import { Component, OnInit } from '@angular/core';

import {  AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,private authService: AuthService) { }

  public email: string = '';
  public password: string = '';

  ngOnInit(): void {
  }

  onAddUser(){
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
    this.router.navigate([`/homeUser`]);
    /*
    this.authService.registerUser(this.email,this.password)
    .then((res) => {
      this.router.navigate([`/homeUser`]);
    }).catch(err => console.log('err', err.message))
    */
  }

}
