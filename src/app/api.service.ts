import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONSTANST } from './utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  public getUser() {
    return this.httpClient.get(CONSTANST.routes.users);
  }

  public getPosts() {
    return this.httpClient.get(CONSTANST.routes.posts);
  }

  public getPostDetail(id: number) {
    return this.httpClient.get(CONSTANST.routes.postDetail.replace(':id', String(id)));
  }

  public getComments(id: number) {
    return this.httpClient.get(CONSTANST.routes.comments.replace(':id', String(id)));
  }
}
