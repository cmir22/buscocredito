import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserI } from '../../models/user.interface';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {


  constructor(public authSvc: AuthService, private authService: AuthService) { }


  public database = firebase.database();

  ngOnInit(): void {
    this.getCurrentUser();

  }


  public isAdmin: any = null;
  public isUser: any = null;
  public isChild: any = null;
  public isUserChild: any = null;
  public userUid: any = null;

  getCurrentUser() {
    this.authSvc.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authSvc.isUserAdmin(this.userUid).subscribe(userRol => {
          this.isUser = Object.assign({}, userRol.userRol).hasOwnProperty('userRol');
          this.isAdmin = Object.assign({}, userRol.adminRol).hasOwnProperty('adminRol');
          
           //this.isAdmin = true;
        })
      }
    })
  }

  navigate(){
    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
    });

  }

  /*
    getCurrentUser() {
    this.authSvc.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authSvc.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.rol).hasOwnProperty('userRol');
           //this.isAdmin = true;
        })
      }
    })
  }
  */


  onLogout(): void {
    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
    });
  }



}

