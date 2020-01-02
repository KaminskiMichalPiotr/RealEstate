import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../shared/user.model';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserEditService } from '../../services/user-edit.service';
import { UserListService } from '../../services/user-list.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {

  @Input() user: User;

  userForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private userEdit: UserEditService, private router: Router,
              private userListService: UserListService) {
  }

  ngOnInit() {
    this.initFrom();
  }

  private initFrom() {
    this.userForm = new FormGroup({
      name: new FormControl({value: this.user.name, disabled: true}),
      surname: new FormControl({value: this.user.surname, disabled: true}),
      login: new FormControl({value: this.user.login, disabled: true}),
      admin: new FormControl({value: this.user.admin, disabled: true}),
      standardUser: new FormControl({value: this.user.standardUser, disabled: true}),
    });
  }

  remove() {
    this.userService.deleteUser(this.user.id).subscribe(value => this.userListService.reload());
  }

  edit() {
    this.userEdit.switch(this.user);
    this.router.navigate(['/edit-user']);
  }

}
