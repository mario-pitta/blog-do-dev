import { User } from './Usuario';

export interface Post {
  id?: string | number;
  title: string;
  subtitle: string;
  author: User;
  content: string;
  createdAt: Date;
  likes: number;
  comments: Comment[];
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
}

export interface Comment {
  author: User;
  createdAt: Date;
  content: string;
}

export class Comment implements Comment {
  constructor(obj: Comment) {
    this.author = obj.author;
    this.content = obj.content;
    this.createdAt = obj.createdAt;
  }
}
