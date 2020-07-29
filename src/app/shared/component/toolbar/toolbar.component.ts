import { Component, OnInit } from '@angular/core';

import { AuthService} from '../../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public authSvc: AuthService) { }

  ngOnInit(): void {
  }

  onLogout(): void{
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
   // this.authSvc.logout();
  }

}
