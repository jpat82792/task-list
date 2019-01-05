import { Component, OnInit } from '@angular/core';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-task-prompt',
  templateUrl: './task-prompt.component.html',
  styleUrls: ['./task-prompt.component.less']
})
export class TaskPromptComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addTask(event, item):void
  {
  	console.log("addTask()");
  	console.log(this);
  	console.log(event);
  	console.log(item);
  }

}
