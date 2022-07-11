import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NewPostComponent } from "./components/newpost/newpost.component";
import { UserSettingsComponent } from "./components/user-settings/user-settings.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'newpost', component: NewPostComponent },
  { path: 'user', component: UserSettingsComponent }
]
