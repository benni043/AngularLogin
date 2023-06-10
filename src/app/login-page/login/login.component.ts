import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {LoginPageService} from "../login-page.service";
import {hashPassword} from "../loginUtils";
import {UserRequest, UserResponse} from "../../utils/userUtils";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router, private loginPageService: LoginPageService) {
  }

  email: string = "";
  password: string = "";

  async submit() {
    let passwordHash = await hashPassword(this.password);

    this.httpClient.post<UserResponse>("http://localhost:8080/user/login", {
      email: this.email,
      password: passwordHash
    } as UserRequest).subscribe({
      next: res => {
        this.cookieService.set("id", String(res.id));
        this.cookieService.set("token", res.token);
        this.router.navigate(["/main"]).then();
      },
      error: err => {
        console.log(err.status)
      }
    })
  }

  toggle() {
    this.loginPageService.loginActive = false;
  }

}
