import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InfoComponent } from './components/info/info.component';
import { FlagPostDialog, PostsComponent } from './components/posts/posts.component';
import { RouterModule } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from "./routing/app-routing.module";
import { SorterComponent } from "./components/sorter/sorter.component";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatOptionModule } from "@angular/material/core";
import { NewPostComponent } from "./components/newpost/newpost.component";
import { UserSettingsComponent } from "./components/user-settings/user-settings.component";
import { EditpostComponent } from './components/editpost/editpost.component';
import { HttpModule } from "./http/http.module";
import { RegisterComponent } from './components/register/register.component';
import { MatIconModule } from '@angular/material/icon';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AboutButtonComponent } from './components/about-button/about-button.component';
import { AboutComponent } from './components/about/about.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsComponent } from './components/terms/terms.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { VerifyComponent } from './components/verify/verify.component';
import { ResetComponent } from './components/reset/reset.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DeleteDialog, DangerZoneComponent } from './components/settings/danger-zone/danger-zone.component';
import { ProfileComponent } from './components/settings/profile/profile.component';
import { AppearanceComponent } from './components/settings/appearance/appearance.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InfoComponent,
    PostsComponent,
    HomeComponent,
    LoginComponent,
    SorterComponent,
    NewPostComponent,
    UserSettingsComponent,
    EditpostComponent,
    RegisterComponent,
    NotfoundComponent,
    AboutButtonComponent,
    AboutComponent,
    PrivacyComponent,
    TermsComponent,
    DeleteDialog,
    FlagPostDialog,
    VerifyComponent,
    ResetComponent,
    ForgotComponent,
    SettingsComponent,
    DangerZoneComponent,
    ProfileComponent,
    AppearanceComponent,
  ],
  imports: [
    MatCheckboxModule,
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatSelectModule,
    MatDialogModule,
    MatOptionModule,
    HttpModule,
    MatIconModule,
    InfiniteScrollModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
