import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FileI } from '../../../shared/models/file.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';
import { auth } from 'firebase';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public image: FileI;
  public currentImage: string;
  public userUid: any = null;

  public isAdmin: any = null;
  public isUser: any = null;
  public isClient: any = null;

  constructor(private authSvc: AuthService) {}

  public profileForm = new FormGroup({
    displayName: new FormControl('', Validators.required),
    email: new FormControl({ value: '', disabled: true }, Validators.required),
    photoURL: new FormControl('', Validators.required),
    uid: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  ngOnInit(): void {
    this.authSvc.userData$.subscribe((user) => {
      this.initValuesForm(user);
    });
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authSvc.isAuth().subscribe((auth) => {
      if (auth) {
        this.userUid = auth.uid;
        this.authSvc.isUserAdmin(this.userUid).subscribe((userRol) => {
          this.isUser = Object.assign({}, userRol.userRol).hasOwnProperty(
            'userRol'
          );
          this.isAdmin = Object.assign({}, userRol.adminRol).hasOwnProperty(
            'adminRol'
          );
          this.isClient = Object.assign({}, userRol.childRol).hasOwnProperty(
            'childRol'
          );
          //this.isAdmin = true;
        });
      }
    });
  }

  reloadPage() {
    //  window.location.reload();
    setTimeout(function () {
      location.reload();
    }, 1000);
  }

  onLogout(): void {
    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
    });
  }

  onSaveUser(user): void {
    //this.authSvc.saveUserProfile(user, this.image);
    this.authSvc.preSaveUserProfile(user, this.image);
  }

  private initValuesForm(user: UserI): void {
    if (user.photoURL) {
      this.currentImage = user.photoURL;
    }
    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
      uid: user.uid,
      photoURL: user.photoURL,
    });
  }

  handdleImage(image: FileI): void {
    this.image = image;
  }
}
