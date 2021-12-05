import { Component, OnInit } from '@angular/core';
import { User } from '../data-type/post';
import { Location } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
    const userData = this.fetchUserFromCookie('user');
    this.user = JSON.parse(userData);
  }

  fetchUserFromCookie(name: string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

  back() {
    this.location.back();
  }

}
