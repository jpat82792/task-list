import { Component, OnInit, Input } from '@angular/core';
import { TaskComponent } from '../task/task.component';
import { Task } from '../classes/task';
@Component({
  selector: 'app-task-prompt',
  templateUrl: './task-prompt.component.html',
  styleUrls: ['./task-prompt.component.less']
})
export class TaskPromptComponent implements OnInit {

  @Input() tasks: Task[];

  constructor() { }

  ngOnInit() {
  }

  addTask(event, item):void
  {
  	console.log("addTask()");
    this.tasks.push(new Task(false, ""));
  }

}
