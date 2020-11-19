import { Component, ElementRef, OnInit } from '@angular/core';

import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { User } from 'firebase';
import * as firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSvc: AuthService, private route: Router,private elementRef: ElementRef) { }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
       this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#B1DEBA';

  }


  public isAdmin: any = null;
  public isUser: any = null;
  public isChild: any = null;
  public userUid: any = null;

   private getCurrentUser() {
    this.authSvc.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authSvc.isUserAdmin(this.userUid).subscribe(userRol => {
          this.isUser = Object.assign({}, userRol.userRol).hasOwnProperty('userRol');
          this.isAdmin = Object.assign({}, userRol.adminRol).hasOwnProperty('adminRol');
          this.isChild = Object.assign({}, userRol.childRol).hasOwnProperty('childRol');
           //this.isAdmin = true;
           if(this.isAdmin == true){
            this.route.navigate(['/about']);
           }else if(this.isUser == true){
            this.route.navigate(['/userWall']);
           }else if(this.isChild == true){
            this.route.navigate(['/homeUser']);
           }else{
            firebase.auth().signOut().then(function () {
            }).catch(function (error) {
            });
            this.route.navigate(['/login']);
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
