import { RouterStateSnapshot, ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private router: Router, private authService: AuthService, private jwtHelper: JwtHelperService) { }

  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    // fix for angular bug (not recognizing localStorage)
    if (!!localStorage.getItem('access') || !!localStorage.getItem('refresh')) {
      const token = localStorage.getItem('access');

      if (!this.jwtHelper.isTokenExpired(token)) {
        return true;
      }
      else {
        return new Promise((resolve) => {
          if (this.authService.refreshTokens().subscribe(data => data))
            setTimeout(() => {
              resolve(true);
            }, 200);
          else {
            this.router.navigate(['/login'])
            resolve(false);
          }
        });
      }
    }
    else {
      this.router.navigate(['/login'])
      return false;
    }
  };
}
