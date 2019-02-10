import { Component, OnInit, Input } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import {TaskPromptComponent } from '../task-prompt/task-prompt.component';
import { Note } from '../classes/note';
import { Task } from '../classes/task';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.less']
})
export class NoteComponent implements OnInit {

	@Input() note:Note;
	incompleteTasks: Array<Task> = [];
	completeTasks: Array<Task> = [];
  @Input() dash: DashboardComponent;
  separator: string = "&#x2404;";
  falseParse: string = "&#x7;";

  constructor(private noteService: NoteService) {
   }

  ngOnInit(){

  	this.setTasks();
  }

  recordTasks(){
    var con = this;
    this.note.body = "";

    this.incompleteTasks.forEach(function(val){
      if(val.complete){
        con.note.body+= val.body+con.separator;
        console.log(con.note.body);
      }
      else{
        con.note.body += con.falseParse+ val.body+ con.separator;
        console.log(con.note.body);  
      }
    });

    this.completeTasks.forEach(function(val){
      if(val.complete){
        con.note.body+= val.body+con.separator;
        console.log(con.note.body);
      }
      else{
        con.note.body += con.falseParse+ val.body+ con.separator;
        console.log(con.note.body);  
      }
    });
  }

  save(): void
  {
  	console.log("Note->Save()");
    this.recordTasks();
    var con = this;
    let note = this.note;
    if(note.id === -1){
      con.postNote(con);
    }
    else{
      con.patchNote(con);
    }
  }

  patchNote(con: any): void{
    this.noteService.updateNote(this.note).subscribe(ok => {
      console.log("patchNote()");
    });
  }

  postNote(con: any): void{
    this.noteService.setNote(this.note).subscribe(ok => {
      console.log(ok);
      con.note.id = ok.result.note_id;
      console.log(con.note);
    });
  }

  delete(): void{
    console.log("Note->delete()");
    this.dash.deleteNote(this.note);
  }

  setTasks(){
  	console.log("setTasks()");
  	var con = this;
  	var body: string[] = this.note.body.split("&#x2404;");
  	body.forEach(function(value){
  		if(value.indexOf('&#x7;') !== -1 )
  		{
  			let body = value.split('&#x7;')[1];				
  			con.completeTasks.push(new Task(true, body));
  		}
  		else{
  			console.log("Not complete");
  			con.incompleteTasks.push(new Task(false, value));
  		}
  	});
  }
}
