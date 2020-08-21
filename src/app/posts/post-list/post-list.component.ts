import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit {
  constructor() {}
  // posts = [
  //   {
  //     title: 'first post',
  //     content: 'this is the content for 1st',
  //   },
  // ];
  posts = [];
  ngOnInit(): void {}
}
