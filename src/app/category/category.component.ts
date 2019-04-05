import { Component, OnInit,  Input } from '@angular/core';
import {Category} from '../classes/category';
import {CategoryService} from '../category.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {

	@Input() possibleCategories: Array<Category> ;
	@Input() active: boolean;
	newCategory: string;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  setCategory(){
  	console.log("setCategory()");
  	this.categoryService.setCategories(this.newCategory).subscribe(ok =>{
  		this.possibleCategories.push(new Category(ok.category.user_id, ok.category, ok.category_id));
  	})
  }

}
