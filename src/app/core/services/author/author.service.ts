import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }


  getAuthors() {
    return this.http.get('localhost:3000/authors');
  }


  getAuthor(id: number) {
    return this.http.get('localhost:3000/authors/' + id);
  }


  createAuthor(author: any) {
    return this.http.post('localhost:3000/authors', author);
  }


  updateAuthor(author: any) {
    return this.http.put('localhost:3000/authors/' + author.id, author);
  }
}
