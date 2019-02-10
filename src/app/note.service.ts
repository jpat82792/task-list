import { Injectable, } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Note } from './classes/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  createNote: string = 'api/notes';
  httpHeaders = {headers: new HttpHeaders({
  	'Authorization': localStorage.getItem('jwtToken'),
    'User':localStorage.getItem('user'),
  	'Content-Type': 'application/json'
  })};
  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse){
  	if(error.error instanceof ErrorEvent){
  		console.error('An error occurred: ', error.error.message);
  	}
  	else{
  	  console.error('Backend returned code ${error.status}',error);
  	}
    console.error(error.error);
  	return throwError("This request has failed  ${{error.status}}");
  }

  getNotes(): Observable<any>{
    return this.http.get<any>(this.createNote, this.httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }

  setNote (note: Note): Observable<any>
  {
  	return this.http.post<any>(this.createNote, {data:{note: note}}, this.httpHeaders)
  	  .pipe(
  	    catchError(this.handleError)
  	  );
  }

  updateNote(note: Note): Observable<any>{
    let updateRoute = this.createNote+'/'+note.id;
    return this.http.patch<any>(updateRoute, {data:{note: note}}, this.httpHeaders)
      .pipe(
        catchError(this.handleError)
      );
  }
}
