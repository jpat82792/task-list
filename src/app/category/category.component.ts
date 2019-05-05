import { Component, OnInit,  Input } from '@angular/core';
import {Category} from '../classes/category';
import {CategoryService} from '../category.service';
import {HttpClient} from '@angular/common/http';
import {Note} from '../classes/note';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent implements OnInit {

	@Input() possibleCategories: Array<Category> ;
	@Input() active: boolean;
  @Input() note: Note;
  chosenCategories = [];
	newCategory: string;
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  setCategory(){
  	console.log("setCategory()");
  	this.categoryService.setCategories(this.newCategory).subscribe(ok =>{
  		console.log(ok);
  		this.possibleCategories.push(new Category(ok.category.user_id, ok.category.category, ok.category_id));
  	})
  }

  categorySelectionChanged(event){
    console.log(event.srcElement.value);
    let category = event.srcElement.value
    if(!this.categoryWasChosen(category)){
      this.chosenCategories.push(category);
    }
    else{
      let index = this.chosenCategories.indexOf(category);
      this.chosenCategories.splice(index,1);
    }
    console.log(this.chosenCategories);

  }
  categoryWasChosen(category){
    return this.chosenCategories.includes(category)  
  }

  addCategory(){
    for(let i = 0 ; i < this.chosenCategories.length; i++){
        let chosenCategory = this.chosenCategories[i];
        if(!this.categoryIsPresent(chosenCategory)){
          this.updateCategory(true);
        }
      }
  }
  addToNoteCategories(){
    let context = this;
    this.chosenCategories.forEach(category =>{
      if(!context.categoryIsPresent(category)){
        context.note.categories.push(category);
      }
    });
  }

  removeFromNoteCategories(){
    let context = this;
    this.chosenCategories.forEach(category =>{
      if(context.categoryIsPresent(category))
      {
        let index = context.findCategoryIndex(category);
        context.note.categories.splice(index, 1);
        console.log(context.note.categories);
      }
    });

  }

  updateCategory(add){
    if(add){
      this.addToNoteCategories()
    }
    else{
      this.removeFromNoteCategories()
    }
    this.chosenCategories = [];
    let selectedOptions = document.querySelectorAll('option:checked');
    console.log(selectedOptions);
    for(let i = 0; i < selectedOptions.length; i++){
      selectedOptions[i].selected = false;
    }
  }

  findCategoryIndex(category){
    return this.note.categories.indexOf(category);
  }

  categoryIsPresent(category): boolean{
    return this.note.categories.includes(category);
  }

  removeCategory(){
    for(let i = 0; i < this.chosenCategories.length; i++){
      let chosenCategory = this.chosenCategories[i];
      if(this.categoryIsPresent(chosenCategory)){
        this.updateCategory(false)
      }
    }
  }

}
