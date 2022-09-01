import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { NewPostComponent } from '../components/newpost/newpost.component';
import { EditpostComponent } from '../components/editpost/editpost.component';
import { RegisterComponent } from '../components/register/register.component';
import { NotfoundComponent } from "../components/notfound/notfound.component";
import { AboutComponent } from '../components/about/about.component';
import { PrivacyComponent } from '../components/privacy/privacy.component';
import { TermsComponent } from '../components/terms/terms.component';
import { VerifyComponent } from "../components/verify/verify.component";
import { ResetComponent} from "../components/reset/reset.component";
import { ForgotComponent} from "../components/forgot/forgot.component";
import { SettingsComponent } from '../components/settings/settings.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { animation: 'HomePage' } },
  { path: 'login', component: LoginComponent, data: { animation: 'LoginPage' } },
  { path: 'user', component: SettingsComponent, data: { animation: 'UserPage' } },
  { path: 'editpost/:post_id', component: EditpostComponent, data: { animation: 'EditPostPage' } },
  { path: 'newpost', component: NewPostComponent, data: { animation: 'NewPostPage' } },
  { path: 'register', component: RegisterComponent, data: { animation: 'RegisterPage' } },
  { path: 'about', component: AboutComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'verify/:Id', component: VerifyComponent, data: { animation: 'VerifyPage' } },
  { path: 'reset/:token', component: ResetComponent, data: { animation: 'ResetPage' } },
  { path: 'forgot', component: ForgotComponent, data: { animation: 'ForgotPage' } },
  { path: '**', component: NotfoundComponent, data: { animation: 'NotfoundPage' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
