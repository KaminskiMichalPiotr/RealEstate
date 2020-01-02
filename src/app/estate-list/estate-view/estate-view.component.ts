import { Component, Input, OnInit } from '@angular/core';
import { RealEstate } from '../../shared/real-estate.model';
import { AuthenticationService } from '../../authorization/authentication.service';
import { UserService } from '../../services/user.service';
import { NavigationExtras, Router } from '@angular/router';
import { User } from '../../shared/user.model';
import { EstateListService } from '../../services/estate-list.service';
import { AnnouncementViewService } from '../../services/announcement-view.service';


@Component({
  selector: 'app-estate-view',
  templateUrl: './estate-view.component.html',
  styleUrls: ['./estate-view.component.css']
})
export class EstateViewComponent implements OnInit {

  @Input() realEstate: RealEstate;
  currentUser: User = UserService.empty();


  constructor(private auth: AuthenticationService, private router: Router, private list: EstateListService, private viewService: AnnouncementViewService) {
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

  edit() {
    this.viewService.switch(this.realEstate);
    this.router.navigate(['/edit-estate']);
  }

  remove() {
    this.list.remove(this.realEstate.id);
  }

  details() {
    this.viewService.switch(this.realEstate);
    this.router.navigate(['/announcement/']);
  }
}
