import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  postsData = [];
  commentData = [];

  // Pagination parameters.
  p: number = 1;
  count: number = 5;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.fetchPost();
  }

  fetchPost() {
    this.apiService.getPosts().subscribe((data: any) => {
      let dataPostWithComment : any = [];
      data.map((post: any) => {
        let tmpComment = [];
        let tmpUser = [];
        this.apiService.getComments(post.id).subscribe((comment: any) => {
          tmpComment.push(comment)
        });
        this.apiService.getUser().subscribe((user: any) => {
          const findUserById = user.find(usr => usr.id === post.userId);
          tmpUser.push(findUserById);
        })
        dataPostWithComment.push({
          post,
          user: tmpUser,
          comment: tmpComment,
        });
      })
      this.postsData = dataPostWithComment;
      // console.log('~ this.postsData', this.postsData);
    })
  }
}
