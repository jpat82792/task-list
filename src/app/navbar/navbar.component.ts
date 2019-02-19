import { Component, OnInit, Input, Inject } from '@angular/core';
import {DOCUMENT} from '@angular/common';

import {DashboardComponent} from '../dashboard/dashboard.component';
import { UrlConstants } from '../classes/UrlConstants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less'],
})
export class NavbarComponent implements OnInit {
	@Input() dash: DashboardComponent;
	location: String;
	dashboard: String = 'dashboard';

  constructor(@Inject(DOCUMENT) private document: Document) { 
  	console.log("Navbar");
  	let parser = this.document.createElement('a');
  	parser.href = this.document.location.href;
  	this.getLocation(parser.pathname);
  }

  ngOnInit() {
  }

  private getLocation(location: string): void{
  	console.log(UrlConstants.DASHBOARD);
  	console.log(location);
  	if(location === UrlConstants.DASHBOARD){
  		console.log("Get here");
  		this.location = this.dashboard;
  	}
  }

  private addNote(): void{
  	this.dash.addNote();
  }
}
