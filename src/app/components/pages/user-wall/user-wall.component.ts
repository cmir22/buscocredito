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
  constructor(
    private postSvc: PostService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private authSvc: AuthService
  ) {}

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
    //console.log("Nueva Solicitud")
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
    });
    this.myFunction();
  }

  ngAfterViewInit() {}

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
    const dialogRef = this.dialog.open(NewPostComponent, config);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result ${result}');
    });
  }
}
