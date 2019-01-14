import { Component, OnInit, Input, DoCheck } from '@angular/core';
import {Task} from '../classes/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less']
})
export class TaskComponent implements OnInit {
//Recompile
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
    console.log(this.task.body);
  	if(event.srcElement.checked)
  	{
      this.changeTaskGroup();
  	}
  	else
  	{
      this.changeTaskGroup();
  	}
  }

  ngDoCheck(){
  }

  changeTaskGroup()
  {
    var indexToRemove = this.completeTasks.indexOf(this.task);
      if(indexToRemove !== -1){
        this.task.complete = false;
        this.completeTasks.splice(indexToRemove, 1);
        this.incompleteTasks.push(this.task);
      }
      else{
        indexToRemove = this.incompleteTasks.indexOf(this.task);
        this.task.complete = true;
        this.incompleteTasks.splice(indexToRemove, 1);
        this.completeTasks.push(this.task);
      }
  }

}

