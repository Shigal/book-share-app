import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Token {

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
