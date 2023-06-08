import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {UserRequest, UserResponse} from "../login-page.component";
import {LoginPageService} from "../login-page.service";
import {hashPassword} from "../loginUtils";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router, private loginPageService: LoginPageService) {
  }

  userName: string = "";
  email: string = "";
  password: string = "";
  password2: string = "";

  checkPasswordCorrectness(password: string, passwordCheck: string) {
    return password === passwordCheck;
  }

  async submit() {
    if (!this.checkPasswordCorrectness(this.password, this.password2)) {
      console.error("the passwords must be the same")
      return;
    }

    let passwordHash = await hashPassword(this.password);

    this.httpClient.post<UserResponse>("http://localhost:8080/user/register", {
      email: this.email,
      userName: this.userName,
      password: passwordHash
    } as UserRequest).subscribe({
      next: res => {
        this.cookieService.set("id", String(res.id));
        this.cookieService.set("token", res.token);
        this.router.navigate(["/main"]).then();
      },
      error: err => {
        console.log(err)
      }
    })
  }

  toggle() {
    this.loginPageService.loginActive = true;
  }
}