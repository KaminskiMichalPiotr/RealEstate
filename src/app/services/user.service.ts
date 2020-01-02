import { Injectable } from '@angular/core';
import { User } from '../shared/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, JSONHeader } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {
  }

  private path = environment.apiUrl + '/user';

  public static empty(): User {
    return new User(null, null, null, null, false, false, null);
  }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.path);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.path + '/' + id);
  }

  submitUser(user: User): Observable<User> {
    return this.http.post<User>(this.path, user, {headers: JSONHeader});
  }
}
