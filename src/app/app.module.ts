import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { EstateListComponent } from './estate-list/estate-list.component';
import { EstateViewComponent } from './estate-list/estate-view/estate-view.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptor } from './authorization/error.interceptor';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorHandler } from './shared/error.handler';
import { JwtInterceptor } from './authorization/jwt.interceptor';
import { EstateAddEditComponent } from './estate-add-edit/estate-add-edit.component';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserViewComponent } from './user-list/user-view/user-view.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBoxComponent,
    EstateListComponent,
    EstateViewComponent,
    LoginComponent,
    EstateAddEditComponent,
    UserAddEditComponent,
    AnnouncementComponent,
    UserListComponent,
    UserViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ErrorHandler,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
