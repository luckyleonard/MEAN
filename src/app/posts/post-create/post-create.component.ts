import { Component } from '@angular/core';
import { LifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
})
export class PostCreateComponent {
  postContent = '';
  onAddPost(postInput: HTMLTextAreaElement) {
    console.dir(postInput);
    this.postContent = postInput.value;
  }
}
