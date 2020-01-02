import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../shared/user.model';
import { Router } from '@angular/router';
import { UserEditService } from '../services/user-edit.service';
import { UserListService } from '../services/user-list.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {

  placeholder = '';
  editMode = false;
  loading = false;
  invalid = false;
  @Input() user: User;
  userForm: FormGroup;

  constructor(private router: Router, private userEdit: UserEditService,
              private userService: UserService, private userListService: UserListService) {
  }

  ngOnInit() {
    if (this.router.url.includes('edit-user')) {
      this.userEdit.currentUser.subscribe(value => {
        this.user = value;
        this.editMode = true;
        this.initForm();
        this.placeholder = 'Enter new password or leave empty';
      });
    } else {
      this.user = UserService.empty();
      this.initForm();
    }
  }


  initForm() {
    this.userForm = new FormGroup({
      name: new FormControl({value: this.user.name ? this.user.name : '', disabled: false}),
      surname: new FormControl({value: this.user.surname ? this.user.surname : '', disabled: false}),
      login: new FormControl({value: this.user.login ? this.user.login : '', disabled: false}),
      password: new FormControl({value: '', disabled: false}),
      admin: new FormControl({value: this.user.admin != null ? this.user.admin : '', disabled: false}),
      standardUser: new FormControl({value: this.user.standardUser != null ? this.user.standardUser : '', disabled: false}),
    });
  }

  submit() {
    const userToPersist = this.validateInput();
    if (userToPersist) {
      this.userService.submitUser(userToPersist).subscribe(value => {
        this.userEdit.switch(value);
        this.userListService.reload();
      }
      );
      this.router.navigate(['/manage-users']);
    } else {
      this.invalid = true;
    }
  }

  private validateInput(): User {
    this.user.name = this.userForm.get('name').value;
    this.user.surname = this.userForm.get('surname').value;
    this.user.login = this.userForm.get('login').value;
    this.user.password = this.userForm.get('password').value ? this.userForm.get('password').value : null;
    this.user.admin = this.userForm.get('admin').value;
    this.user.standardUser = this.userForm.get('standardUser').value;
    if (this.editMode && this.user.name && this.user.surname && this.user.login && this.user.admin != null
      && this.user.id && this.user.standardUser != null) {
      return this.user;
    } else if (!this.editMode && this.user.name && this.user.surname && this.user.login
      && this.user.admin != null && this.user.standardUser != null && this.user.password) {
      return this.user;
    } else {
      return null;
    }
  }

  private extract(controller: string): any {
    return this.userForm.get(controller).value;
  }
}
