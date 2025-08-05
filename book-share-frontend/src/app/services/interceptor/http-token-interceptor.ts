import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Token } from '../token/token';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {

  const tokenService = inject(Token);
  const token = tokenService.token;
  if (token) {
    const authRequest = req.clone({
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    });
    return next(authRequest);
  }

  return next(req);
};
