import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    let httpOptions = {headers: new HttpHeaders({'Authorization': localStorage.getItem('jwtToken')})};
    this.http.get('/api/loginState', httpOptions).subscribe(data => {
      console.log(data);
    }, err =>{
        this.router.navigate(['logon']);
    });
  }

}
