import { Component, OnInit, Inject, Input } from '@angular/core';
//import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostI } from '../../../shared/models/post.interface';
import { PostService } from '../../../components/posts/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  private image: any;
  private imageOriginal: any;

  @Input() post: PostI;

  constructor(private postSvc: PostService) { }

  public editPostForm = new FormGroup({
    id: new FormControl('', Validators.required),
    nameUser: new FormControl('', Validators.required),
    moneyPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
    monthPost: new FormControl('', Validators.required)
  });

  ngOnInit(): void {
    this.image = this.post.imagePost;
    this.imageOriginal = this.post.imagePost;
    this.initValuesForm();
  }

  editPost(post: PostI) {
    console.log('img', this.image);
    console.log('original', this.imageOriginal);

    if (this.image == this.imageOriginal) {
      post.imagePost = this.imageOriginal;
      this.postSvc.editPostById(post)
    } else {
      this.postSvc.editPostById(post, this.image)
    }

  }

  handleImage(event: any): void {
    this.image = event.target.files[0];
    //console.log('Image', this.image);
  }

  private initValuesForm(): void {
    this.editPostForm.patchValue({
      id: this.post.id,
      nameUser: this.post.nombre,
      moneyPost: this.post.montoSolicitado,
      tagsPost: this.post.tipoCredito,
      monthPost: this.post.plazo

    });
  }

}
