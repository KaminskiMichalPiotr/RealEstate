import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../shared/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private currentUsersSubject: BehaviorSubject<User[]>;
  public currentUsers: Observable<User[]>;

  constructor(private userService: UserService) {
    this.currentUsersSubject = new BehaviorSubject<User[]>([]);
    this.currentUsers = this.currentUsersSubject.asObservable();
    this.userService.getUsers().subscribe(value => this.currentUsersSubject.next(value));
  }

  reload() {
    this.userService.getUsers().subscribe(value => this.currentUsersSubject.next(value));
  }
}
