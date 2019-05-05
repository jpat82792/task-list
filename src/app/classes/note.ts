import {Task} from './task';
export class Note{
	public state: boolean;
	public incompleteTasks: Array<Task>;
	public completeTasks: Array<Task>;
	constructor(public id: number, public type: string, 
		public title: string, public body: string, 
		public categories: any)
	{
		this.state = false;
		this.incompleteTasks = [];
		this.completeTasks = [];
	}
}