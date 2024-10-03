import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../../models/Post';
import { Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


/**
 * The function `getPosts()` retrieves an array of `Post` objects from an API endpoint using HTTP GET
 * request in TypeScript.
 * @returns An Observable of an array of Post objects is being returned.
 */
  getPosts()  : Observable<Post[]> {
    return this.http.get<Post[]>(environment.apiUrl+'/posts').pipe(take(1));
  }

/**
 * This function retrieves a post with a specific ID from an API using HTTP GET request in TypeScript.
 * @param {number} id - The `id` parameter in the `getPost` method is a number that represents the
 * unique identifier of the post you want to retrieve. This method makes an HTTP GET request to the
 * specified API endpoint to fetch the post with the corresponding `id`.
 * @returns An Observable of an array of Post objects is being returned.
 */
  getPost(id: number):  Observable<Post[]> {
    return this.http.get<Post[]>(environment.apiUrl+'/posts?id=' + id).pipe(take(1));
  }

/**
 * The `createPost` function sends a POST request to the specified API endpoint with the provided post
 * data.
 * @param {any} post - The `createPost` function takes a `post` object as a parameter. This `post`
 * object contains the data that will be sent in the HTTP POST request to the specified API endpoint
 * (`environment.apiUrl+'/posts'`). The function uses the Angular `HttpClient` service to make the POST
 * request and
 * @returns The `createPost` function is returning an Observable that makes a POST request to the
 * specified API endpoint (`/posts`) with the `post` data. The `take(1)` operator
 * is used to ensure that only one value is emitted by the Observable before completing.
 */
  createPost(post: any) {
    return this.http.post(environment.apiUrl+'/posts', post).pipe(take(1));
  }

/**
 * The `updatePost` function sends a PUT request to update a post using the provided post data.
 * @param {any} post - The `updatePost` function is used to update a post by sending a PUT request to
 * the API endpoint with the updated post data. The `post` parameter represents the post object that
 * contains the updated information for the post to be updated.
 * @returns The `updatePost` method is returning an Observable that makes a PUT request to the API
 * endpoint for updating a post with the given `post` object. The `take(1)` operator is used to ensure
 * that the Observable completes after emitting the first value.
 */
  updatePost(post: any) {
    return this.http.put(environment.apiUrl+'/posts/' + post.id, post).pipe(take(1));
  }
}
