import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';

import { FormGroup, FormControl, Validators } from '@angular/forms';


import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSvc: AuthService, private route: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
  /*  const user: UserI = {
      email: 'cruz@gmail.com',
      password: '123456'
    };
    this.authSvc.loginByEmail(user);
    */
  }



  onLogin(form: UserI) {
    this.authSvc
    .loginByEmail(form)
    .then(res =>{
      console.log('Successfuly ', res);
      this.route.navigate(['/homeUser']);
    })
    .catch(err => console.log('Error', err));
  }
}
