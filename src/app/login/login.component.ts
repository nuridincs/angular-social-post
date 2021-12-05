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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService:ApiService
  ) { }

  ngOnInit(): void {
    this.frmLogin = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get formErr() { return this.frmLogin.controls; }

  login(): void {
    this.submitted = true;

    if (this.frmLogin.invalid) {
      return;
    }

    this.getUser();
  }

  getUser() {
    this.apiService.getUser().subscribe((data: any) => {
      const userData = data.find(user => user.username === this.frmLogin.value.username);
      if (userData !== undefined) {
        this.setCookie('user', userData);
        this.router.navigate(['/dashboard']);
      } else {
        console.log('password or username invalid');
      }
    });
  }

  setCookie(name, value) {
    const cookie = [name, '=', JSON.stringify(value), '; path=/;'].join('');
    document.cookie = cookie;
  }
}
