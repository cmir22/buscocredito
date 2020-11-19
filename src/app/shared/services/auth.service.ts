import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { FileI } from '../models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, map } from 'rxjs/operators';

import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData$: Observable<firebase.User>;

  private filePath: string;


  constructor(private afsAuth: AngularFireAuth, private storage: AngularFireStorage, private afs: AngularFirestore) {
    this.userData$ = afsAuth.authState;
  }

  loginByEmail(user: UserI) {
    const { email, password } = user;
    return this.afsAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.afsAuth.signOut();
  }

  preSaveUserProfile(user: UserI, image: FileI): void {
    if (image) {
      this.uploadImage(user, image);
    } else {
      this.saveUserProfile(user);
    }

  }


  private uploadImage(user: UserI, image: FileI): void {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(urlImage => {
          user.photoURL = urlImage;
          this.saveUserProfile(user);
        });
      })
    ).subscribe();
  }


  private async saveUserProfile(user: UserI): Promise<any> {
    (await this.afsAuth.currentUser).updateProfile({
      displayName: user.displayName,
      photoURL: user.photoURL
    }).then(() => console.log('User updated'))
      .catch(err => console.log('error', err));
  }


  //R


  registerUser(email: string,password: string){
    return new Promise ((resolve,reject) =>{
      this.afsAuth.createUserWithEmailAndPassword(email,password)
      .then(userData$ => resolve(userData$)),
      err =>reject(err);
    });
  }



  public updateUserData(user: UserI) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserI = {
      uid: user.uid,
      email: user.email,
      userRol: {
        userRol: true
       }

    }
    return userRef.set(data, { merge: true })
  }

  public updateUserDataWorker(user: UserI,emailEmpresa) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: UserI = {
      uid: user.uid,
      email: user.email,
      emailEmpresa: emailEmpresa,
      childRol: {
        childRol: true
       }

    }
    return userRef.set(data, { merge: true })
  }



  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }


  isUserAdmin(userUid){
    return this.afs.doc<UserI>(`users/${userUid}`).valueChanges();
  }

  


}
