import { Component, OnInit } from '@angular/core';

import { PostService } from '../../posts/post.service';
import { PostI } from '../../../shared/models/post.interface';
import { Observable } from 'rxjs';

import { UserI } from 'src/app/shared/models/user.interface';
import { NewPostComponent } from '../../posts/new-post/new-post.component'
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ModalComponent } from 'src/app/shared/component/modal/modal.component';

import { NewWorkerComponent } from '../../../new-worker/new-worker.component';
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
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {


  constructor(private postSvc: PostService, public dialog: MatDialog, private route: ActivatedRoute, private authSvc: AuthService) { }

  //displayedColumns: string[] = ['nameUser', 'moneyPost', 'monthPost', 'tagsPost', 'actions'];
  displayedColumns: string[] = ['nameUser', 'moneyPost', 'tagsPost', 'monthPost', 'actions'];
  dataSource = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();

  public posts$: Observable<PostI[]>;
  public users$: Observable<UserI[]>;

  //--------GET POST--------------------------------------------------

  onNewPost() {
    this.openDialogNew();
    //console.log("Nueva Solicitud")
  }

  //--------GET POST--------------------------------------------------

  DisplayTableCredits() {

    var divWorkers = document.getElementById("divWorkers");
    var divCredits = document.getElementById("divCredits");


    if (divCredits.style.display == "none") {
      divCredits.style.display = "block";
    } else {
      divCredits.style.display = "none";
    }

  }


  DisplayTableWorkers() {

    var divWorkers = document.getElementById("divWorkers");
    var divCredits = document.getElementById("divCredits");


    if (divWorkers.style.display == "none") {
      divWorkers.style.display = "block";
    } else {
      divWorkers.style.display = "none";
    }


  }

  //----------------------------------------------------------

  ngOnInit(): void {

    //--------GET POST--------------------------------------------------

    this.posts$ = this.postSvc.getAllPosts();
    this.postSvc.getAllPosts().subscribe(posts => (this.dataSource2.data = posts));

    //--------GET USERS--------------------------------------------------
    this.users$ = this.postSvc.getAllUsers();
    this.postSvc.getAllUsers().subscribe(users => (this.dataSource.data = users));

    //Inicialice Values-------------------------------------------------
    this.authSvc.userData$.subscribe(user => {
      this.initValuesForm(user);
    });

    this.DisplayTableWorkers();
    this.DisplayTableCredits();

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

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
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

  //----------------------------------------------------------

  onDeletePost(post: PostI) {
    console.log('Delete post', post);

    Swal.fire({
      title: 'Estas Seguro?',
      text: 'Esto no podra ser Revertido',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'black',
      cancelButtonColor: 'red',
      confirmButtonText: 'Si, Acepto'
    }).then(result => {
      if (result.value) {
        // Desea Borra
        this.postSvc.deletePostById(post).then(() => {
          Swal.fire('Borrado', 'El post ha sido Borrado', 'success');
        }).catch(() => {
          Swal.fire('Error!', 'Ha existido un eror', 'error');
        });
        //console.log('Borrar');  
      }
    })

  }

  //----------------------------------------------------------

  public openDialog(post?: PostI): void {
    const config = {
      data: {
        message: post ? 'Editar Post' : 'New Post',
        content: post
      }
    };
    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result ${result}');
    });
  }

  //----------------------------------------------------------

  public openDialogNew(post?: PostI): void {
    const config = {
      data: {
        message: post ? 'Edit Post' : 'New Post',
        content: post
      }
    };
    const dialogRef = this.dialog.open(NewPostComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result ${result}');
    });
  }

  //----------------------------------------------------------


  openDialogRegister() {

    this.dialog.open(NewWorkerComponent, {
      width: '550px',
      height: '450px',
    });

  }


}
