import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent {
  postTitle = '';
  postContent = '';
  @Output() postCreated = new EventEmitter();

  onAddPost() {
    const post = {
      postTitle: this.postTitle,
      postContent: this.postContent,
    };
    this.postCreated.emit(post); //向父级发送自己的属性值
  }
}
