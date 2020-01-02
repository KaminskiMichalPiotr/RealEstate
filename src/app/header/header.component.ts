import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authorization/authentication.service';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isCollapsed = false;

  currentUser: User = UserService.empty();

  constructor(private auth: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    this.auth.currentAuthentication.subscribe(value => {
      if (value && value.user) {
        this.currentUser = value.user;
      } else {
        this.currentUser = UserService.empty();
      }
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    if (this.auth.currentAuthenticationValue) {
      this.auth.logout();
      this.router.navigate(['/']);
    }
  }

}
