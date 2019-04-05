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
import { NavbarComponent } from '../navbar/navbar.component';
import {Category} from '../classes/category';
import {CategoryService} from '../category.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild("findme") findme: TemplateRef<any>;
  notes: Note[] = [];
  @ViewChild("activeNote") activeNote: TemplateRef<any>;
  categories: Array<Category> = [];
  dialogNote: Note = new Note(-1, "list","","","list"); 
  dialogState: boolean = false;
  constructor(private http: HttpClient, private router: Router, 
    private noteService: NoteService, private categoryService: CategoryService) { }

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
    console.log("Did I get the dialog?");
    console.log(this.activeNote);
    this.getNotes();
    this.getCategories();
  }

  getCategories(){
    let con = this;
    this.categoryService.getCategories().subscribe(result =>{
      result.categories.forEach((value)=>{
        con.categories.push(new Category(value.user_id, value.category, value.category_id))
      });
    console.log(this.categories);
    });
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

  public addNote(): void{
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

  openDialog(note: Note): void{
    console.log("openDialog()");
    this.dialogNote = note;
    this.dialogNote.state = true;
    this.dialogState = true;
  }

  closeDialog(): void{
    console.log("closeDialog()");

    this.dialogNote.state = false;
       // this.dialogNote = null;
    this.dialogState = false;
  }

  setCategory(): void{
    console.log("setCategory()");
  }

}
