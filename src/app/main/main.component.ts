import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(private httpClient: HttpClient, private cookieService: CookieService, private router: Router) {
    this.getAllUsers().then();
  }

  async getAllUsers() {
    this.httpClient.get<User[]>("http://localhost:8080/user?token=" + this.cookieService.get("token")).subscribe({
      next: res => {
        this.userList = res;
      },
      error: err => {
        console.log(err)
      }
    })
  }

  userList: User[] = [];

  delete(id: number) {
    this.httpClient.delete<number>("http://localhost:8080/user/" + id + "?ownId=" + this.cookieService.get("id") + "&token=" + this.cookieService.get("token")).subscribe({
      next: res => {
        console.log(res)
        this.getAllUsers().then();
      },
      error: err => {
        console.log(err);
      }
    })
  }

  logout() {
    this.cookieService.deleteAll("/");
    this.router.navigate(["/login"]).then();
  }
}

export type User = {
  id: number,
  jwtToken: string,
  email: string,
  userName: string,
  password: string
}
