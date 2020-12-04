import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { PostService } from '../post.service'
import { Observable } from 'rxjs';
import { PostI } from 'src/app/shared/models/post.interface';
import { UserI } from 'src/app/shared/models/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/component/modal/modal.component';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private route: ActivatedRoute, private postSvc: PostService, private db: AngularFirestore) { }

  public post$: Observable<PostI>;
  tipoPrestamo = "";

  onLogout(): void {
    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
    });
  }

  setData(idPost) {
    const formBid = document.querySelector('#formBid');
    formBid.addEventListener('submit', (e) => {
      e.preventDefault();
      let bidBanco = (<HTMLInputElement>document.querySelector('#bidBanco')).value;
      let bidTiempo = (<HTMLInputElement>document.querySelector('#bidTiempo')).value;
      this.db.collection("posts").doc(`${idPost}`).update({
        Banco: bidBanco,
        tipoPrestamo: this.tipoPrestamo,
        bidTiempo: bidTiempo
      })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
    })
  }

  ngOnInit(): void {
    const idPost = this.route.snapshot.params.id;
    this.post$ = this.postSvc.getOnePost(idPost);
    //this.setData(idPost)
    this.setData(idPost);
  }

}
