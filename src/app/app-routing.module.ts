import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewPostComponent } from './components/newpost/newpost.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { NgModule } from '@angular/core';
import { EditpostComponent } from './components/editpost/editpost.component';
import { RegisterComponent } from './components/register/register.component';
import {NotfoundComponent} from "./components/notfound/notfound.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserSettingsComponent },
  { path: 'editpost/:post_id', component: EditpostComponent },
  { path: 'newpost', component: NewPostComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
