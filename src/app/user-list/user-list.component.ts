import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user.model';
import { UserListService } from '../services/user-list.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private userListService: UserListService) {
  }

  ngOnInit() {
    this.userListService.currentUsers.subscribe(value => this.users = value);
  }


}
