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
import { PostsComponent } from './components/posts/posts.component';
import { RouterModule } from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from "./routing/app-routing.module";
import { SorterComponent } from "./components/sorter/sorter.component";
import { MatSelectModule } from "@angular/material/select";
import { MatDialogModule } from "@angular/material/dialog";
import { MatOptionModule } from "@angular/material/core";
import { NewPostComponent } from "./components/newpost/newpost.component";
import { UserSettingsComponent } from "./components/user-settings/user-settings.component";
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { ProfileIconComponent } from './components/profile-icon/profile-icon.component';
import { AddIconComponent } from './components/add-icon/add-icon.component';
import { EditpostComponent } from './components/editpost/editpost.component';
import { HttpModule } from "./http/http.module";
import { RegisterComponent } from './components/register/register.component';
import { MatIconModule } from '@angular/material/icon';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProceeddialogueComponent } from './components/proceeddialogue/proceeddialogue.component';
import { MatCheckboxModule} from "@angular/material/checkbox";

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
    HomeHeaderComponent,
    ProfileIconComponent,
    AddIconComponent,
    EditpostComponent,
    RegisterComponent,
    NotfoundComponent,
    ProceeddialogueComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
