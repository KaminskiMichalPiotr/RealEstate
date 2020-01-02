import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthenticationService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.currentAuthenticationValue) {
      const currentUser = this.auth.currentAuthenticationValue.user;
      if (currentUser != null) {
        if (currentUser.admin) {
          // logged in so return true
          return true;
        }
      }
    }
    // not logged as admin in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

}
