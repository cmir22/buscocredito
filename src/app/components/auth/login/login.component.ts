import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSvc: AuthService, private route: Router, private elementRef: ElementRef, private db: AngularFirestore) { }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';

  }
  public isAdmin: any = null;
  public isUser: any = null;
  public isChild: any = null;
  public isFather: any = null;
  public userUid: any = null;
  datos: any[] = [];
  trabajador: any = '';

  private getCurrentUser() {
    this.authSvc.isAuth().subscribe(auth => {
      if (auth) {
        this.userUid = auth.uid;
        this.authSvc.isUserAdmin(this.userUid).subscribe(userRol => {
          this.isUser = Object.assign({}, userRol.userRol).hasOwnProperty('userRol');
          this.isAdmin = Object.assign({}, userRol.adminRol).hasOwnProperty('adminRol');
          this.isChild = Object.assign({}, userRol.childRol).hasOwnProperty('childRol');
          this.isFather = Object.assign({}, userRol.fatherRol).hasOwnProperty('fatherRol');
          if (this.isAdmin == true) {
            this.route.navigate(['/admin']);
          } else if (this.isUser == true) {
            this.route.navigate(['/user']);
          } else if (this.isChild == true) {
            this.route.navigate(['/workers']);
          } else if (this.isFather == true) {
            this.route.navigate(['/financiera']);
          } else {
            firebase.auth().signOut().then(function () {
            }).catch(function (error) {
            });
            this.route.navigate(['/login']);
          }
        })
      }
    })
  }

  getData(trabajador) {
    this.db
      .collection("users")
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          this.datos.push(doc.data());
          if (doc.data().emailTrabajador === trabajador) {
            console.log('Exito');
            this.route.navigate(['/workers']);
          }
        });
      });
  }

  public onLogin(form: UserI) {
    this.authSvc.loginByEmail(form).then(res => {
      console.log('Successfuly ', res);
      this.trabajador = res.user.email;
      this.getData(this.trabajador)
      console.log(this.trabajador)
      this.getCurrentUser();
    })
      .catch(err => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Haz introducido un Email erroneo o Contraseña ',
      }));

  }






}
