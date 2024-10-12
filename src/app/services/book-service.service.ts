import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { Books } from '../models/books';
import { HttpParams } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/book/allbooks';
@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  apiUrl: string = "http://localhost:8080/book/";
  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<any> {
     return this.http.get<any>(baseUrl,{ params });
  }
 get(id: any): Observable<Books> {
    return this.http.get<Books>(`${baseUrl}/${id}`);
  }
 create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }
 getAllBook() {
    return this.http.get(`${this.apiUrl}allbooks`)
  }
 
   // Function to borrow a book
borrowBook(bookId: string, userId: string): Observable<any> {
    const params = new HttpParams()
      .set('bookId', bookId)
      .set('userId', userId);

    return this.http.post(`${this.apiUrl}borrowedBook`, params, { responseType: 'json' });
  }

   // Function to borrow a book
returnBook(bookId: string, userId: string): Observable<any> {
    const params = new HttpParams()
      .set('bookId', bookId)
      .set('userId', userId);

    return this.http.post(`${this.apiUrl}returnBook`, params, { responseType: 'json' });
  }
 
}
