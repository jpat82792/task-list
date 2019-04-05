import {Task} from './task';
export class Note{
	public state: boolean;
	public incompleteTasks: Array<Task>;
	public completeTasks: Array<Task>;
	public categories: Array<string>;
	constructor(public id: number, public type: string, public title: string, public body: string, public category: string)
	{
		this.state = false;
		this.incompleteTasks = [];
		this.completeTasks = [];
		this.categories = [];
	}
}