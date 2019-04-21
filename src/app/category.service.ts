import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';;
import {HttpClient} from '@angular/common/http';
import {ServiceConstants} from './serviceConstants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

	private categoryRoute: string= 'api/category';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<any>{
  	return this.http.get<any>(this.categoryRoute, ServiceConstants.httpHeaders)
  	.pipe(
  		catchError(ServiceConstants.handleError)
  	);
  }
  setCategories(category: string): Observable<any>{
  	return this.http.post<any>(this.categoryRoute,{data:{category:category}}, ServiceConstants.httpHeaders)
  	.pipe(
  		catchError(ServiceConstants.handleError)
  	);
  }
}
