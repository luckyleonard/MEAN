import { Component, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from './../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  postTitle = '';
  postContent = '';
  @Output() postCreated = new EventEmitter<Post>();

  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    const post: Post = {
      title: postForm.value.title,
      content: postForm.value.content,
    };
    this.postCreated.emit(post); //向父级发送自己的属性值
  }
}
