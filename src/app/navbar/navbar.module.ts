import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {DashboardModule} from '../dashboard/dashboard.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TaskListRoutingModule } from '../task-list-routing/task-list-routing.module';

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    DashboardModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    TaskListRoutingModule,
  ],
  providers:[],
  bootstrap:[NavbarComponent],
  exports:[NavbarComponent],
})
export class NavbarModule { }
