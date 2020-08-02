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

  }




  onLogout(): void {
    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
    });
  }



}

