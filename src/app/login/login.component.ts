import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  frmLogin: FormGroup;
  submitted = false;
  user = null;
  isError: boolean = false;
  message: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService:ApiService
  ) {
    this.checkUserLogin();
  }

  ngOnInit(): void {
    this.frmLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  checkUserLogin() {
    const userData = this.fetchUserFromCookie('user');
    const userParse = JSON.parse(userData);

    if (userParse) {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.router.navigateByUrl('/');
    }
  }

  get formErr() { return this.frmLogin.controls; }

  login(): void {
    this.submitted = true;

    if (this.frmLogin.invalid) {
      return;
    }

    if (this.frmLogin.value.username === this.frmLogin.value.password) {
      this.getUser();
    } else {
      this.isError = true;
      this.message = 'Username or password invalid';
    }

  }

  getUser() {
    this.apiService.getUser().subscribe((data: any) => {
      const userData = data.find(user => user.username === this.frmLogin.value.username);
      if (userData !== undefined) {
        this.setCookie('user', userData);
        this.router.navigate(['/dashboard']);
        this.isError = false;
      } else {
        this.isError = true;
        this.message = 'Username or password invalid';
      }
    });
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

  setCookie(name, value) {
    const cookie = [name, '=', JSON.stringify(value), '; path=/;'].join('');
    document.cookie = cookie;
  }
}
