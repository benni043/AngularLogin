import { Component } from '@angular/core';
import {LoginPageService} from "./login-page.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(public loginPageService: LoginPageService) {
  }

}
