import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router'

import { PostService } from '../post.service'
import { Observable } from 'rxjs';
import { PostI } from 'src/app/shared/models/post.interface';
import { UserI } from 'src/app/shared/models/user.interface';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../../../shared/component/modal/modal.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {


  public post$ : Observable<PostI>;
  constructor(private route: ActivatedRoute, private postSvc:PostService) { }

  ngOnInit(): void {
    const idPost = this.route.snapshot.params.id;
    this.post$ = this.postSvc.getOnePost(idPost);
  }



}
