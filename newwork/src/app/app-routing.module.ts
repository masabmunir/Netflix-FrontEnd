import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateComponent } from './update/update.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AuthGuard } from './auth/auth.guard';
import { EditImageComponent } from './edit-image/edit-image.component';
import { MoviesComponent } from './movies/movies.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'list', canActivate:[AuthGuard], component: ListComponent, children: [{
      path: 'home', component: HomeComponent
    }, {
      path: 'dashboard', component: DashboardComponent},
    { path: 'update/:id', component: UpdateComponent },
    { path: 'adduser', component: AdduserComponent },
    {path:'movies',component:MoviesComponent},
    
    {path:'editimage/:id',component:EditImageComponent}]
  },
  { path: 'header', component: HeaderComponent },
  { path: 'sidenav', component: SidenavComponent }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
