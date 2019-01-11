import { Component, OnInit, Input } from '@angular/core';
import {Task} from '../classes/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {

	@Input() task: Task;
	@Input() incompleteTasks: Task[];
	@Input() completeTasks: Task[];
	
	body: string;
	complete: boolean;
  constructor() { }

  ngOnInit() {
  	this.complete = this.task.complete;
  	this.body = this.task.body;
  }

  toggleComplete(event)
  {
  	console.log("toggleComplete()");
  	if(event.srcElement.checked)
  	{

  	}
  	else
  	{

  	}
  }

}

