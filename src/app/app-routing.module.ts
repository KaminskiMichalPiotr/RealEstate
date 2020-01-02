import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EstateListComponent } from './estate-list/estate-list.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { EstateAddEditComponent } from './estate-add-edit/estate-add-edit.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthAdminGuard } from './authorization/auth-admin.guard';
import { AuthGuard } from './authorization/auth.guard';


const routes: Routes = [
  {path: 'login', component: LoginComponent, data: {title: 'Login page'}},
  {path: 'add-user', component: UserAddEditComponent, canActivate: [AuthAdminGuard]},
  {path: 'edit-user', component: UserAddEditComponent, canActivate: [AuthAdminGuard]},
  {path: 'manage-users', component: UserListComponent, canActivate: [AuthAdminGuard]},
  {path: 'add-estate', component: EstateAddEditComponent, canActivate: [AuthGuard]},
  {path: 'edit-estate', component: EstateAddEditComponent, canActivate: [AuthGuard]},
  {path: 'announcement', component: AnnouncementComponent},
  {path: '**', component: EstateListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
