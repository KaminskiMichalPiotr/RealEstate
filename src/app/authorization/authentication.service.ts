import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../shared/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Authentication } from '../shared/authentication.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentAuthenticationSubject: BehaviorSubject<Authentication>;
  public currentAuthentication: Observable<Authentication>;

  constructor(private http: HttpClient) {
    // check if token exist and didn't expire
    if (this.hasTokenExpired()) {
      this.currentAuthenticationSubject = new BehaviorSubject<Authentication>
          (JSON.parse(localStorage.getItem('userToken')));
      this.currentAuthentication = this.currentAuthenticationSubject.asObservable();
    } else {
      this.currentAuthenticationSubject = new BehaviorSubject<Authentication>(null);
      this.currentAuthentication = this.currentAuthenticationSubject.asObservable();
    }
  }

  public get currentAuthenticationValue(): Authentication {
    return this.currentAuthenticationSubject.value;
  }

  public login(username: string, password: string): Observable<Authentication> {
    const body = `username=${username}&password=${password}&grant_type=${environment.grantType}`;
    return this.http.post<any>(
      `${environment.apiUrl}/oauth/token`,
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', Authorization: 'Basic '
            + btoa(`${environment.clientId}:${environment.clientSecret}`)
        }
      }
    )
      .pipe(map(token => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        let expire = new Date();
        expire = new Date(expire.getTime() + token.expires_in * 1000);
        const auth = new Authentication(null, token.access_token, expire.getTime());
        localStorage.setItem('userToken', JSON.stringify(auth));
        this.currentAuthenticationSubject.next(auth);
        this.getUserFromToken().subscribe(value => {
          auth.user = value;
          localStorage.setItem('userToken', JSON.stringify(auth));
          this.currentAuthenticationSubject.next(auth);
        });
        return auth;
      }));
  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('userToken');
    this.currentAuthenticationSubject.next(null);
  }

  private getUserFromToken(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/user/current`,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }

  private hasTokenExpired(): boolean {
    const tokenData = JSON.parse(localStorage.getItem('userToken')) as Authentication;
    if (tokenData) {
      if (tokenData && tokenData.expire > new Date().getTime()) {
        return true;
      }
    }
    return false;
  }


}

