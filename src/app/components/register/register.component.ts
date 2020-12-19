import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {  AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,private authService: AuthService,private afs: AngularFirestore) { }

  public email: string = '';
  public password: string = '';

  ngOnInit(): void {
    let formRegister = (<HTMLInputElement>document.querySelector('#formRegister'));
    formRegister.addEventListener('submit', e => {
      e.preventDefault();
      let email = (<HTMLInputElement>document.querySelector('#email')).value;
      let password = (<HTMLInputElement>document.querySelector('#password')).value;
      this.onAddUser(email, password)
    })
  }

  onAddUser(email: any, password: any){
    return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(userData => {
      resolve(userData),
      this.authService.updateUserData(userData.user)
      this.router.navigate([`/user`]);
    }).catch(err => Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Haz introducido un email existente o una contraseña demaciado facil',
    }))
  });
}


}


