import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { PostService } from '../../posts/post.service'
import { PostI } from 'src/app/shared/models/post.interface';

import Swal from 'sweetalert2'

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['nameUser', 'moneyPost', 'monthPost', 'tagsPost', 'actions'];
  dataSource = new MatTableDataSource();


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private postSvc: PostService) { }

  ngOnInit(): void {
    this.postSvc.getAllPosts().subscribe(posts => (this.dataSource.data = posts));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onEditPost(post: PostI) {
    console.log('Edit post', post);
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
      confirmButtonText: 'Si, Acepto'
    }).then(result =>{
      if(result.value){
        // Desea Borra
        console.log('Borrar');
        Swal.fire('Borrado','El post ha sido Borrado','success');
      }
    })

  }

  onNewPost() {
    console.log("Nueva Solicitud")
  }




}
