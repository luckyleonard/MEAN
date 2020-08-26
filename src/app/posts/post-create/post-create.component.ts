import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PostsService } from './../post.service';
import { Post } from './../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
  // postTitle = '';
  // postContent = '';
  post: Post;
  mode: string = 'Create';
  isLoading: boolean = false;
  private postId: string;

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {} //构建一个PostsService实例 和 route实例获取params

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'Edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe((postData) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
          };
          this.isLoading = false;
        });
      } else {
        this.mode = 'Create';
        this.postId = null;
      }
    });
  }

  onSavePost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'Create') {
      this.postsService.addPost(postForm.value.title, postForm.value.content); //调用postService的mutation
    } else {
      this.postsService.updatePost(
        this.postId,
        postForm.value.title,
        postForm.value.content
      );
    }

    postForm.resetForm();
  }
}
