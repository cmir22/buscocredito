import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostI } from '../../shared/models/post.interface';
import { Action } from 'rxjs/internal/scheduler/Action';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private asf: AngularFirestore) { }


  public getAllPosts(): Observable<PostI[]> {
    return this.asf.collection('posts')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as PostI;
            const id = a.payload.doc.id;
            return { id, ...data };

          }))
      )
  }


public getOnePost(id:PostI): Observable<PostI>{
  return this.asf.doc<PostI>(`posts/${id}`).valueChanges();
}


}
