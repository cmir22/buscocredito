import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PostService } from '../../posts/post.service';
import { PostI } from '../../../shared/models/post.interface';
import { Observable } from 'rxjs';
import { UserI } from 'src/app/shared/models/user.interface';
import { NewPostComponent } from '../../posts/new-post/new-post.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ModalComponent } from 'src/app/shared/component/modal/modal.component';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

interface creditTipe {
  value: string;
  viewValue: string;
}


interface months {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-wall',
  templateUrl: './user-wall.component.html',
  styleUrls: ['./user-wall.component.scss'],
})
export class UserWallComponent implements OnInit, AfterViewInit {
  usuarioEmail: string;
  idUsuarioo: string;
  constructor(
    private postSvc: PostService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private authSvc: AuthService,
    private db: AngularFirestore
  ) { }

  displayedColumns: string[] = [
    'nameUser',
    'moneyPost',
    'monthPost',
    'tagsPost',
    'actions',
  ];
  dataSource = new MatTableDataSource();

  public posts$: Observable<PostI[]>;
  public users$: Observable<UserI[]>;

  onNewPost() {
    this.openDialogNew();
  }

  myFunction() {
    var x = document.getElementById('myDIV');
    if (x.style.display === 'none') {
      x.style.display = 'block';
    } else {
      x.style.display = 'none';
    }
  }

  ngOnInit(): void {

    this.posts$ = this.postSvc.getAllPosts();
    this.users$ = this.postSvc.getAllUsers();
    this.postSvc
      .getAllPosts()
      .subscribe((posts) => (this.dataSource.data = posts));

    this.authSvc.userData$.subscribe((user) => {
      this.initValuesForm(user);
      this.usuarioEmail = user.email;
    });
    this.myFunction();

    this.getData();


  }

  aceptarCredito() {
    Swal.fire("Haz Aceptado el crédito, te contactarán lo más breve posible.");
  }


  onLogout(): void {
    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
    });
  }

  ngAfterViewInit() { }

  //----------------------------------------------------------

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //----------------------------------------------------------
  public newPostForm = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  private initValuesForm(user: UserI): void {
    this.newPostForm.patchValue({
      email: user.email,
    });
  }

  //----------------------------------------------------------
  onEditPost(post: PostI) {
    console.log('Edit post', post);
    this.openDialog(post);
  }

  onDeletePost(post: PostI) {
    console.log('Delete post', post);

    Swal.fire({
      title: 'Estas Seguro?',
      text: 'Esto no podra ser Revertido',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'black',
      cancelButtonColor: 'red',
      confirmButtonText: 'Si, Acepto',
    }).then((result) => {
      if (result.value) {
        // Desea Borra
        this.postSvc
          .deletePostById(post)
          .then(() => {
            Swal.fire('Borrado', 'El post ha sido Borrado', 'success');
          })
          .catch(() => {
            Swal.fire('Error!', 'Ha existido un eror', 'error');
          });
        //console.log('Borrar');
      }
    });
  }

  public openDialog(post?: PostI): void {
    const config = {
      data: {
        message: post ? 'Editar Post' : 'New Post',
        content: post,
      },
    };
    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result ${result}');
    });
  }

  public openDialogNew(post?: PostI): void {

    const config = {
      data: {
        message: post ? 'Edit Post' : 'New Post',
        content: post,
      },
    };
    const dialogRef = this.dialog.open(NewPostComponent,
      {
        width: '620px',
        height: '550px'
      });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result ${result}');
    });
  }

  datos: any[] = [];
  getData() {
    this.db
      .collection("propuestas")
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          this.datos.push(doc.data());
        });
      });
  }

}


