import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserEditService {


  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  switch(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

}
