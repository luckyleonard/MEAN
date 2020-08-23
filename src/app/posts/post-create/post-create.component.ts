import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostsService } from './../post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  // postTitle = '';
  // postContent = '';
  constructor(public postsService: PostsService) {} //构建一个PostsService实例
  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    this.postsService.addPost(postForm.value.title, postForm.value.content); //调用postService的mutation
    postForm.resetForm();
  }
}
