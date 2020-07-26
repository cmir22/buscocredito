import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup,FormControl,Validators} from '@angular/forms';
import { PostI} from '../../../shared/models/post.interface';
import { PostService } from '../../../components/posts/post.service';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})


export class NewPostComponent implements OnInit {

  private image: any;

 public newPostForm = new FormGroup({
    nameUser : new FormControl('',Validators.required),
    moneyPost : new FormControl('',Validators.required),
    tagsPost : new FormControl('',Validators.required),
    imagePost : new FormControl('',Validators.required),
    monthPost : new FormControl('',Validators.required)
  });

  constructor(public dialog:MatDialogRef<NewPostComponent>,@Inject(MAT_DIALOG_DATA) public message: string, private postSVC: PostService) { }

  ngOnInit(): void {
  }

  addNewPost(data: PostI){
    console.log('New Post',data);
    this.postSVC.preAddAndUpdatePost(data, this.image);
  }

  handleImage(event:any): void{
    this.image = event.target.files[0];
    //console.log('Image', this.image);
  }

}
