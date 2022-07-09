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
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import { routes} from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InfoComponent,
    PostsComponent,
    HomeComponent,
    LoginComponent,
  ],
    imports: [
      FormsModule,
      RouterModule.forRoot(routes),
      HttpClientModule,
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
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
