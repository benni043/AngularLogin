import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {DisplayUser, User} from "../utils/userUtils";

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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.cookieService.get("token")}`
    })

    this.httpClient.get<DisplayUser[]>("http://localhost:8080/user", {headers: headers}).subscribe({
      next: res => {
        this.userList = res;
      },
      error: err => {
        console.log(err)
      }
    })
  }

  userList: DisplayUser[] = [];

  delete(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.cookieService.get("token")}`
    })

    this.httpClient.delete<number>("http://localhost:8080/user/" + id + "?ownId=" + this.cookieService.get("id"), {headers: headers}).subscribe({
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
