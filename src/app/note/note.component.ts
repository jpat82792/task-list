import { Component, OnInit, Input } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import {TaskPromptComponent } from '../task-prompt/task-prompt.component';
import { Note } from '../classes/note';
import { Task } from '../classes/task';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.less']
})
export class NoteComponent implements OnInit {

	@Input() note:Note;
	incompleteTasks: Array<Task> = [];
	completeTasks: Array<Task> = [];

  constructor() {
   }

  ngOnInit() {

  	this.setTasks();
  }
  save(): void
  {
  	console.log("Note->Save()");
  }
  setTasks()
  {
  	console.log("setTasks()");
  	var con = this;
  	var body: string[] = this.note.body.split("&#x2404;");
  	body.forEach(function(value){
  		console.log(value);
  		console.log(con.incompleteTasks);
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
