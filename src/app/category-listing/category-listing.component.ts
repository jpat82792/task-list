import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-category-listing',
  templateUrl: './category-listing.component.html',
  styleUrls: ['./category-listing.component.less']
})
export class CategoryListingComponent implements OnInit {

	@Input() categories;
  constructor() { }

  ngOnInit() {
  }

}
