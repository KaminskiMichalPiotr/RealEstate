import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { ErrorHandler } from '../shared/error.handler';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService, private err: ErrorHandler) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // logout when 401 response returned from api
        this.auth.logout();
        location.reload(true);
      }
      const error = err.error;
      return throwError(error);
    }));
  }
}
