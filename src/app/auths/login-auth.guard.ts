import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginAuthService} from "./login-auth.service";

@Injectable({
  providedIn: 'root'
})
export class LoginAuthGuard implements CanActivate {
  constructor(private authService: LoginAuthService, private router: Router) {
  };

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    console.log("login auth called")

    let isLoggedIn = this.authService.isAuthenticated();

    if (isLoggedIn) {
      console.log("true")
      return true
    } else {
      this.router.navigate(['/login']).then();
      return false
    }
  }

}
