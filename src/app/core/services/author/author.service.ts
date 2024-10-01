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
