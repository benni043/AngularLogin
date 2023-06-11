import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {LoginPageService} from "../login-page.service";
import {hashPassword} from "../loginUtils";
import {UserRequest, UserResponse} from "../../utils/userUtils";
import {AlertService} from "../../alert/alert.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router, private loginPageService: LoginPageService, private alertService: AlertService) {
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
      this.alertService.newError("Die Passwörter müssen gleich sein!");
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
        switch (err.status) {
          case 406: {
            this.alertService.newError("Diese E-Mail wird bereits verwendet!");
            break;
          }
          default: {
            this.alertService.newError("Unbekannter Fehler!");
          }
        }
      }
    })
  }

  toggle() {
    this.loginPageService.loginActive = true;
  }

  passwordActive: boolean = false;
  checked: boolean = false;
  next() {
    this.passwordActive = true;
  }

  back() {
    this.passwordActive = false;
  }

  checkedToggle() {
    this.checked = !this.checked
  }
}
