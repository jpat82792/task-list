import { Component, OnInit, Input, ViewChild, AfterViewInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { EditorComponent } from '../editor/editor.component';
import { TaskComponent } from '../task/task.component';
import { Note } from '../classes/note';
import { NoteService } from '../note.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild("findme") findme: TemplateRef<any>;
  notes: Note[] = [];
  //[new Note(-1, "list", "first list", "Do this&#x2404;&#x7;Do this after that", 
    //"list")];
  constructor(private http: HttpClient, private router: Router, 
    private noteService: NoteService) { }

  ngOnInit() {
    let httpOptions = {headers: new HttpHeaders({'Authorization': 
      localStorage.getItem('jwtToken')})};
    this.http.get('/api/loginState', httpOptions).subscribe(data => {
      console.log("authenticated");
    }, err =>{
        this.router.navigate(['logon']);
    });
  }
  ngAfterViewInit(){
    console.log(this.findme);
    this.getNotes();
  }

  getNotes(): void{
    var con = this;
    this.noteService.getNotes().subscribe(result =>{
      console.log("getNotes()");
      result.notes.forEach((value)=>{
        con.notes.push(new Note(value.note_id, value.type, 
          value.title, value.body, value.type))
      })
    });
  }

  addNote(): void{
    var con = this;
    this.notes.push(new Note(-1, "list", "","","list"));
  }

  //TODO: Add message for event that deleteIndex == -1
  deleteNote(note: Note): void{
    console.log("deleteNote()");
    let con = this;
    let index = this.notes.indexOf(note);
    this.noteService.deleteNote(note).subscribe((result)=>{
      if(result.success){
        con.notes.splice(index,1);
      }
      else{
        //TODO add error message here;
      }
    });

  }

}
