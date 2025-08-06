import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class Token {
  isTokenNotValid() {
    return !this.isTokenValid();
  }
  isTokenValid() {
    const token: string = this.token;
    if (!token) {
      return false;
    }
    //decode the token
    const jwtHelper = new JwtHelperService();
    // check expiry date
    const isTokenExpired: boolean = jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      localStorage.clear();
      return false;
    }
    return true;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  
  set token(token: string) {
    if (isPlatformBrowser(this.platformId)) {
    localStorage.setItem('token', token);
    }
  }

  get token() {
    if (isPlatformBrowser(this.platformId)) {
    return localStorage.getItem('token') as string;
    }
    return '';
  }
}
