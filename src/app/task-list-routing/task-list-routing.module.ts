import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { DashboardComponent  } from '../dashboard/dashboard.component';

const routes: Routes = [
{path: 'sign-up', component: SignUpComponent},
{path: 'dashboard', component: DashboardComponent},
{path: '', redirectTo: '/sign-up', pathMatch: 'full'},
{path: '**', redirectTo:'/'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class TaskListRoutingModule { }
