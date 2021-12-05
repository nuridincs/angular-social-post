import { PostDetail, User } from './../data-type/post';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  postDetail: PostDetail;
  id: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params.id;
    this.fetchPostDetail(this.id);
  }

  fetchPostDetail(id: number) {
    this.apiService.getPostDetail(id).subscribe((post: any) => {
      this.apiService.getComments(post.id).subscribe((comment: any) => {
        this.apiService.getUser().subscribe((user: User) => {
          const findUserById = user.find(usr => usr.id === post.userId);
          this.postDetail = {
            post,
            comment,
            user: findUserById,
          };
          console.log('~ dataPostWithComment', this.postDetail);
        })
      });
    })
  }

  generateName(email: string) {
    const splitNameByEmail = email.split("@");
    return splitNameByEmail[0];
  }

  back() {
    this.location.back();
  }
}
