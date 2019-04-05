import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
export abstract class ServiceConstants{
	public static  httpHeaders = {headers: new HttpHeaders({
  	'Authorization': localStorage.getItem('jwtToken'),
    'User':localStorage.getItem('user'),
  	'Content-Type': 'application/json'
  })};

  public static  httpDeleteHeaders = {headers: new HttpHeaders({
    'Authorization': localStorage.getItem('jwtToken'),
    'User':localStorage.getItem('user'),
    'Content-Type': 'text'
  })};

  public static handleError(error: HttpErrorResponse){
  	if(error.error instanceof ErrorEvent){
  		console.error('An error occurred: ', error.error.message);
  	}
  	else{
  	  console.error('Backend returned code ',error.headers);
  	}
    console.error("Error-status: ", error.statusText, "Error-type: ",error.type, "Error: ",error.error,)
  	return throwError("This request has failed  "+error.status);
  }
}