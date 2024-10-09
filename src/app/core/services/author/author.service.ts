import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../../models/Usuario';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  /** The line `loggedUser: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({});` in the
`AuthorService` class is initializing a `BehaviorSubject` named `loggedUser` with an initial value
of an empty object `{}` of type `IUser`. */
  loggedUser: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({});

  /**
   * The function `getLoggedUser` returns the value of the logged-in user.
   * @returns The `getLoggedUser()` function is returning the value of the `loggedUser` property, which
   * is of type `IUser`.
   */
  getLoggedUser(): IUser {
    return this.loggedUser.value;
  }

  constructor(private http: HttpClient) {
    this.loggedUser.next(JSON.parse(localStorage.getItem('user')!));

  }

  /**
   * The `getAuthors` function makes an HTTP GET request to retrieve a list of authors from the specified
   * API endpoint.
   * @returns The `getAuthors()` function is returning an HTTP GET request to the '/authors' endpoint of
   * the API specified in the `environment.apiUrl` variable.
   */
  getAuthors() {
    return this.http.get<IUser[]>(environment.apiUrl + '/authors');
  }

  /**
   * The getAuthor function retrieves author data from an API based on the provided ID.
   * @param {number} id - The `id` parameter in the `getAuthor` function is of type `number`, and it
   * represents the unique identifier of the author whose information is being retrieved from the API.
   * @returns The `getAuthor` function is returning an HTTP GET request to the specified API endpoint for
   * retrieving author information based on the provided `id`.
   */
  getAuthor(id: number) {
    return this.http.get(environment.apiUrl + '/authors/' + id);
  }

  /**
   * The function `createAuthor` sends a POST request to the API endpoint `/authors` with the provided
   * author data.
   * @param {IUser} author - The `createAuthor` function takes an `author` object of type `IUser` as
   * a parameter. This `author` object likely contains information about the author such as their name,
   * biography, or other relevant details. The function then sends a POST request to the specified API
   * endpoint to create a new
   * @returns The `createAuthor` function is returning an HTTP POST request to the specified API endpoint
   * `/authors` with the `author` object as the payload.
   */
  createAuthor(author: IUser) {
    return this.http.post(environment.apiUrl + '/authors', author);
  }

  /**
   * The function `updateAuthor` sends a PUT request to update an author's information using the provided
   * author object.
   * @param {any} author - The `updateAuthor` function takes an `author` object as a parameter. This
   * object should have an `id` property that is used to identify the author to be updated. The function
   * then sends a PUT request to the API endpoint `/authors/{author.id}` with the updated author object
   * to update
   * @returns The `updateAuthor` method is returning an HTTP PUT request to update the author with the
   * specified `id` using the `environment.apiUrl`.
   */
  updateAuthor(author: any) {
    return this.http.put(environment.apiUrl + '/authors/' + author.id, author);
  }

  /**
   * The login function sends a GET request to the server with the provided email and password to
   * authenticate the user.
   * @param {string} email - The `email` parameter in the `login` function is a string that represents
   * the email address of the user trying to log in.
   * @param {string} password - The `password` parameter in the `login` function is a string that
   * represents the password input provided by the user during the login process.
   * @returns An HTTP GET request is being made to the specified API endpoint '/authors' with query
   * parameters 'name' set to the email and 'password' set to the password. The response is expected to
   * be an array of IUser objects.
   */
  login(email: string, password: string) {
    return this.http.get<IUser[]>(
      environment.apiUrl + '/authors?name=' + email + '&password=' + password
    );
  }

  /**
   * The function `createRandomAuthor` generates a random full name by combining a random first name and
   * a random last name from predefined lists.
   * @returns The `createRandomAuthor()` function returns a randomly generated full name by combining a
   * random first name from the `nomes` array and a random last name from the `sobrenomes` array.
   */
  createRandomAuthor() {
    const nomes = ['Ana', 'Pedro', 'Maria', 'João', 'Carlos'];
    const sobrenomes = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira'];

    // Seleciona aleatoriamente um nome da lista de nomes
    const nomeAleatorio = nomes[Math.floor(Math.random() * nomes.length)];

    // Seleciona aleatoriamente um sobrenome da lista de sobrenomes
    const sobrenomeAleatorio =
      sobrenomes[Math.floor(Math.random() * sobrenomes.length)];

    // Combina o nome e sobrenome para formar o nome completo
    const nomeCompleto = `${nomeAleatorio} ${sobrenomeAleatorio}`;

    return nomeCompleto;
  }
}
