import { Component, OnInit } from '@angular/core';
import { PostService} from '../components/posts/post.service';
import { PostI} from '../shared/models/post.interface';
import { Observable } from 'rxjs';
import { UserI } from 'src/app/shared/models/user.interface';
import * as firebase from 'firebase';

interface creditTipe {
  value: string;
  viewValue: string;
}

interface months {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.scss']
})
export class WorkerComponent implements OnInit {

  credits: creditTipe[] = [
    {value: 'personal-0', viewValue: 'Personal'},
    {value: 'negocio-1', viewValue: 'Negocio'}
  ];

  month: months[] = [
    {value: 'personal-0', viewValue: '12 Meses'},
    {value: 'negocio-1', viewValue: '24 Meses'},
    {value: 'negocio-1', viewValue: '36 Meses'},
    {value: 'negocio-1', viewValue: '48 Meses'},
  ];

    public posts$ : Observable<PostI[]>;
    public users$ : Observable<UserI[]>;
  constructor(private postSvc: PostService) { }

  onLogout(): void {
    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
    });
  }

  ngOnInit(): void {
    this.posts$ = this.postSvc.getAllPosts();
    this.users$ = this.postSvc.getAllUsers();
    
  }

}
