import { Injectable, } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Note } from './classes/note';
import {ServiceConstants} from './serviceConstants';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  createNote: string = 'api/notes';


  constructor(private http: HttpClient) { }

  getNotes(): Observable<any>{
    return this.http.get<any>(this.createNote, ServiceConstants.httpHeaders)
      .pipe(
        catchError(ServiceConstants.handleError)
      );
  }

  setNote (note: Note): Observable<any>
  {
  	return this.http.post<any>(this.createNote, {data:{note: note}}, 
      ServiceConstants.httpHeaders)
  	  .pipe(
  	    catchError(ServiceConstants.handleError)
  	  );
  }

  updateNote(note: Note): Observable<any>{
    const updateRoute = this.createNote+'/'+note.id;
    return this.http.patch<any>(updateRoute, {data:{note: note}}, 
      ServiceConstants.httpHeaders)
      .pipe(
        catchError(ServiceConstants.handleError)
      );
  }

  deleteNote(note: Note): Observable<any>{
    console.log("note service delete note");
    console.log(note);
    const deleteRoute = this.createNote+'/'+note.id;
    console.log(deleteRoute);
    return this.http.delete(deleteRoute, ServiceConstants.httpHeaders)
    .pipe(
      catchError(ServiceConstants.handleError)
    );
  }
}
