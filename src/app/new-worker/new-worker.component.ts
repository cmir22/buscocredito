import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserI } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-new-worker',
  templateUrl: './new-worker.component.html',
  styleUrls: ['./new-worker.component.scss'],
})
export class NewWorkerComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private afs: AngularFirestore
  ) {}

  public email: string = '';
  public password: string = '';


  ngOnInit(): void {
    this.authService.userData$.subscribe((user) => {
      this.initValuesForm(user);
    });
  }

  onAddUser(email: string, pass: string,emailEmpresa) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userData) => {
          resolve(userData),
          console.log("Entro")
            this.authService.updateUserDataWorker(userData.user,emailEmpresa);
        })
        .catch((err) => console.log(reject(err)));
    });
  }

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
