import { Component, Output, EventEmitter } from '@angular/core';
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

  onAddPost() {
    const post: Post = {
      title: this.postTitle,
      content: this.postContent,
    };
    this.postCreated.emit(post); //向父级发送自己的属性值
  }
}
