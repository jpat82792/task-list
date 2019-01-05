import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.less']
})
export class EditorComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    let httpOptions = {headers: new HttpHeaders({
      'Authorization': localStorage.getItem('jwtToken')
    })
    };
    this.http.get('/api/loginState', httpOptions).subscribe(data =>{
      console.log("authenticated");
    }, err => {
      this.router.navigate(['logon']);
    });
  }


}
