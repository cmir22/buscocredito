import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { PostI } from '../../shared/models/post.interface';
import { FileI } from '../../shared/models/file.interface';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AngularFireStorage } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsCollection: AngularFirestoreCollection<PostI>;
  private filePath: any;
  private downloadURL: Observable<string>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.postsCollection = afs.collection<PostI>('posts');
  }


  public getAllPosts(): Observable<PostI[]> {
    return this.postsCollection
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


  public getOnePost(id: PostI): Observable<PostI> {
    return this.afs.doc<PostI>(`posts/${id}`).valueChanges();
  }

  public deletePostById(PostI) {
    return this.postsCollection.doc(PostI.id).delete();
  }

  public editPostById(post: PostI, newImage?: FileI) {

    if (newImage) {
      this.uploadImage(post, newImage);
    } else {
      return this.postsCollection.doc(post.id).update(post);
    }

  }

  public preAddAndUpdatePost(post: PostI, image: FileI): void {
    this.uploadImage(post, image);
  }

  private uploadImage(post: PostI, image: FileI) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(urlImage => {
        this.downloadURL = urlImage;
        this.savePost(post);
      });

    })
    ).subscribe();
  }

  private savePost(post: PostI) {
    //   console.log('PostSvc', post);
    const postObj = {
      nameUser: post.nameUser,
      moneyPost: post.moneyPost,
      imagePost: this.downloadURL,
      fileRef: this.filePath,
      tagsPost: post.tagsPost,
      monthPost: post.monthPost
    };

    if (post.id) {
      return this.postsCollection.doc(post.id).update(postObj);
    } else {
      //edit post
      return this.postsCollection.add(postObj);
    }



  }

}
