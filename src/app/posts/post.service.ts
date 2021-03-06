import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(public httpClient: HttpClient, private router: Router) {} //初始化httpClient 用来发送请求

  getPosts() {
    this.httpClient
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          //map来自于RXjs 可以用来处理http返回的数据
          return postData.posts.map((post) => {
            //这个map是js自带的map
            return {
              title: post.title,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      }); //subscribe才会发起http请求
  }

  getPost(postId: string) {
    return this.httpClient.get<{ _id: string; title: string; content: string }>(
      'http://localhost:3000/api/posts/' + postId
    );
  }

  getPostsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { title, content };
    this.httpClient
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((responseData) => {
        post.id = responseData.postId; //新添加的数据 添加db生成的_id
        this.posts.push(post); //更新本地数据
        this.postsUpdated.next([...this.posts]); //更新observable
        this.router.navigate(['/']); //返回首页
      });
  }

  updatePost(postId: string, title: string, content: string) {
    const updatedPost: Post = { id: postId, title, content };
    this.httpClient
      .patch<{ message: string }>(
        'http://localhost:3000/api/posts/' + postId,
        updatedPost
      )
      .subscribe((response) => {
        const updatedPosts = [...this.posts];
        this.posts = updatedPosts.map((post) => {
          if (post.id === updatedPost.id) {
            return updatedPost;
          }
          return post;
        });
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string) {
    this.httpClient
      .delete<{ message: string }>('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
