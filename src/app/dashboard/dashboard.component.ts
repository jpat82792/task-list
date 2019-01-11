import { Component, OnInit, Input, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { EditorComponent } from '../editor/editor.component';
import { TaskComponent } from '../task/task.component';
import { Note } from '../classes/note';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild("findme") findme: TemplateRef<any>;
  notes: Note[] = [new Note("list", "first list", "Do this&#x2404;&#x7;Do this after that")];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    let httpOptions = {headers: new HttpHeaders({'Authorization': 
      localStorage.getItem('jwtToken')})};
    this.http.get('/api/loginState', httpOptions).subscribe(data => {
      console.log("authenticated");
    }, err =>{
        this.router.navigate(['logon']);
    });
    console.log(this.notes[0].title);
  }
  ngAfterViewInit(){
    console.log(this.findme);
  }

}
