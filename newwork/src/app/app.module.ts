import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule} from '@angular/material/menu';
import { UpdateComponent } from './update/update.component';
import { AdduserComponent } from './adduser/adduser.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NextDirective } from './directive/next.directive';
import { PrevDirective } from './directive/prev.directive';
import { ToastrModule } from 'ngx-toastr';
import { EditImageComponent } from './edit-image/edit-image.component';
import { MoviesComponent } from './movies/movies.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    ListComponent,
    HeaderComponent,
    SidenavComponent,
    HomeComponent,
    DashboardComponent,
    UpdateComponent,
    AdduserComponent,
    NextDirective,
    PrevDirective,
    EditImageComponent,
    MoviesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    Ng2SearchPipeModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot(),

 ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
