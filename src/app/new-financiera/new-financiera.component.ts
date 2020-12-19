import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../shared/services/auth.service';
import * as firebase from 'firebase';
import { UserI } from '../shared/models/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-financiera',
  templateUrl: './new-financiera.component.html',
  styleUrls: ['./new-financiera.component.scss']
})
export class NewFinancieraComponent implements OnInit {

  constructor(private authService: AuthService, private db: AngularFirestore, private authSvc: AuthService) { }

  // Variables for login user
  emailEmpresa: string;
  formCreateWorker


  ngOnInit(): void {
    var formCreateWorker = (<HTMLFormElement>document.querySelector('#formCreateWorker'));
    formCreateWorker.addEventListener('submit', () => {
      this.onAddUser();
    })
    this.authSvc.userData$.subscribe((user) => {
      this.initValuesForm(user);
      this.emailEmpresa = user.email;
      console.log(this.emailEmpresa)
    });
  }

  onAddUser() {
    var email = (<HTMLInputElement>document.querySelector('#email')).value;
    var password = (<HTMLInputElement>document.querySelector('#password')).value;
    var nombre = (<HTMLInputElement>document.querySelector('#nombre')).value;
    var ciudad = (<HTMLInputElement>document.querySelector('#ciudad')).value;
    var noTrabajador = (<HTMLInputElement>document.querySelector('#noTrabajador')).value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        const idCustom = this.db.createId();
        // Here we insert into the database
        this.db.collection('users').doc(`${idCustom}`).set({
          idTrabajador: idCustom,
          emailTrabajador: email,
          nombreTrabajador: nombre,
          ciudadTrabajador: ciudad,
          noTrabajador: noTrabajador,
          emailEmpresa: this.emailEmpresa,
          fatherRol: {
            fatherRol: true
          }
        })
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
  }

  /*
  onAddUser(email: string, pass: string){
    return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
    .then(userData => {
      resolve(userData),
      this.authService.updateUserDataWorker(userData.user,this.nombre)
    }).catch(err => console.log(reject(err)))
  });
  }
  */
  //----------------------------------------------------------------
  public profileForm = new FormGroup({
    emailEmpresa: new FormControl({ value: '', disabled: true }, Validators.required),
  });

  private initValuesForm(user: UserI): void {
    this.profileForm.patchValue({
      emailEmpresa: user.email
    });
  }

}
