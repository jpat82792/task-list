import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TaskListRoutingModule } from './task-list-routing/task-list-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    DashboardComponent,
    LoginComponent
  ],
  imports: [
  BrowserModule,
  FormsModule,
  HttpClientModule,
  TaskListRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
