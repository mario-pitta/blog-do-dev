import { Author } from './Author';

export interface Post {
  id?: string | number;
  title: string;
  author: Author;
  content: string;
}

export class Post implements Post {
  constructor(obj: {
    id: string | number;
    title: string;
    author: Author;
    content: string;
  }) {
    this.author = obj.author;
    this.content = obj.content;
    this.title = obj.title;
    this.id = obj.id;
  }

  get getAuthor() {
    return this.author;
  }


  get getId() {
    return this.id;
  }
}
