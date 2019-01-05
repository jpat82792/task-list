import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { DashboardComponent  } from '../dashboard/dashboard.component';
import { LoginComponent  } from '../login/login.component';

const routes: Routes = [
{path: 'signup', component: SignUpComponent},
{path: 'dashboard', component: DashboardComponent},
{path: 'logon', component: LoginComponent},
{path: '', component: LoginComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class TaskListRoutingModule { }
