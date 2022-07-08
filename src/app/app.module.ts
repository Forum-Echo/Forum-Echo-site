import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { InfoComponent } from './components/info/info.component';
import { PostsComponent } from './components/posts/posts.component';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import { routes} from "./app-routing.module";
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    InfoComponent,
    PostsComponent,
    HomeComponent,
    LoginComponent
  ],
    imports: [
      FormsModule,
      RouterModule.forRoot(routes),
      HttpClientModule,
      BrowserModule,
      RouterModule,
      ReactiveFormsModule,
      FlexLayoutModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
