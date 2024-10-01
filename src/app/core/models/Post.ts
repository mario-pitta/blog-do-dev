import { Author } from './Author';

export interface Post {
  id?: string | number;
  title: string;
  subtitle: string;
  author: Author;
  content: string;
  createdAt: Date;
  likes: number;
  comments: any[];
}

export class Post implements Post {
  constructor(obj: Post) {
    this.author = obj.author;
    this.content = obj.content;
    this.title = obj.title;
    this.subtitle = obj.subtitle;
    this.id = obj.id;
    this.createdAt = obj.createdAt;
    this.likes = obj.likes;
    this.comments = obj.comments;

  }

  get getAuthor() {
    return this.author;
  }


  get getId() {
    return this.id;
  }
}
