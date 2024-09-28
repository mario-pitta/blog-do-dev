import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../models/Post';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  getPosts()  : Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:3000/posts').pipe(take(1));
  }

  getPost(id: number):  Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:3000/posts?id=' + id).pipe(take(1));
  }

  createPost(post: any) {
    return this.http.post('http://localhost:3000/posts', post).pipe(take(1));
  }

  updatePost(post: any) {
    return this.http.put('http://localhost:3000/posts/' + post.id, post).pipe(take(1));
  }
}
