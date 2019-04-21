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
  @Input() noteEditStatus;
  @Input() dash: DashboardComponent;
  categoryStatus: boolean;
  separator: string = "&#x2404;";
  completeMetaCharacter: string = "&#x7;";

  constructor(private noteService: NoteService) {
   }

  ngOnInit(){

  	this.setTasks();
    this.noteEditStatus = false;
  }

  recordTasks(){
    this.clearTaskFromBody();
    this.prepareTasksForRecording();
  }

  clearTaskFromBody(){
    this.note.body = "";
  }

  prepareTasksForRecording(){
    this.prepareIncompleteTasks();
    this.prepareCompleteTasks();
  }

  prepareIncompleteTasks(){
    let context = this;
    this.note.incompleteTasks.forEach((task)=>{
      context.writeTaskToNoteBody([task.body,context.separator]);
    });
  }

  writeTaskToNoteBody(taskParts: string[]){
    let context = this;
    taskParts.forEach((value)=>{
      context.note.body += value;
    });
  }

  prepareCompleteTasks(){
    let context = this;
    let numberOfCompleteTasks = this.note.completeTasks.length-1
    this.note.completeTasks.forEach((task, index)=>{
      if(index === numberOfCompleteTasks){
        context.writeTaskToNoteBody([context.completeMetaCharacter,task.body]);
      }
      else{
        context.writeTaskToNoteBody([context.completeMetaCharacter, task.body, context.separator])
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
    let tasks = this.splitBodyOnUnicodeSeparator("&#x2404;");
    this.sortTasks(tasks);
  }

  addToCompletedTasks(task: Task){
    this.note.completeTasks.push(task);
  }

  addToIncompleteTasks(task :Task){
    this.note.incompleteTasks.push(task);
  }

  trimCompleteMetaCharacter(value: string):string{
    return value.split('&#x7;')[1];
  }

  taskIsComplete(task: string){
    let parsedTask = this.trimCompleteMetaCharacter(task);
    this.addToCompletedTasks(new Task(true, parsedTask));
  }

  taskIsIncomplete(task: string){
    this.addToIncompleteTasks(new Task(false, task));
  }

  sortTasks(tasks: string[]){
    let con = this;
    tasks.forEach((task)=>{
      con.sortTask(task);
    });
  }

  isTaskComplete(task: string){
    return task.indexOf('&#x7;') !== -1;
  }

  sortTask(task:string){
    if(this.isTaskComplete(task)){
      this.taskIsComplete(task);
    }
    else{
      this.taskIsIncomplete(task);
    }
  }

  splitBodyOnUnicodeSeparator(delimiter):string[]{
    return this.note.body.split(delimiter);
  }

  openCategoryComponent(){
    console.log("openCategoryComponent()");
    this.categoryStatus = !this.categoryStatus;
  }

}
