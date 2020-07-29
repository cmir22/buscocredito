import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl , Validators} from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { UserI } from '../../../shared/models/user.interface';
import { FileI } from '../../../shared/models/file.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public image: FileI;
  public currentImage: string;


  constructor(private authSvc: AuthService) { }

  public profileForm = new FormGroup({
    displayName: new FormControl('',Validators.required),
    email: new FormControl({value:'',disabled: true},Validators.required),
    photoURL: new FormControl('',Validators.required)
  })

  ngOnInit(): void {
    this.authSvc.userData$.subscribe(user =>{
      this.initValuesForm(user);
    })
  }


  reloadPage(){
  //  window.location.reload();

    setTimeout(
      function(){ 
      location.reload(); 
      }, 1000);
  }

  onSaveUser(user:UserI):void{
    //this.authSvc.saveUserProfile(user, this.image);
    this.authSvc.preSaveUserProfile(user,this.image)
  }

  private initValuesForm(user:UserI): void{
    if(user.photoURL){
      this.currentImage = user.photoURL;
    }
    this.profileForm.patchValue({
      displayName: user.displayName,
      email: user.email,
      //photoURL: user.photoURL
    })
  }

  handdleImage(image: FileI):void{
    this.image= image;
  }
  

}
