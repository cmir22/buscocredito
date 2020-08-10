import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { User } from 'firebase';

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

  }


  public isAdmin: any = null;
  public userUid: any = null;

   private getCurrentUser() {
    this.authSvc.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authSvc.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.userRol).hasOwnProperty('userRol');
           //this.isAdmin = true;
           if(this.isAdmin == true){
            this.route.navigate(['/homeUser']);
           }else{
            this.route.navigate(['/about']);
           }
        })
      }
    })
  }



  public onLogin(form: UserI) {
    this.authSvc.loginByEmail(form).then(res => {
      console.log('Successfuly ', res);
      this.getCurrentUser();
    })
      .catch(err => console.log('Error', err));

  }






}
