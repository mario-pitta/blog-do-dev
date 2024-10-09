export interface IUser {
  id?: string | number;
  name?: string;
  email?: string;
  phone?: string;
  github?: string;
  password?: string;
}


export class User implements IUser {
  id?: string | number;
  name?: string;
  email?: string;
  phone?: string;
  github?: string;
  password?: string;

  constructor(obj?: {
    id?: string
    name?: string
    email?: string
    phone?: string
    github?: string
    password?: string
  }) {
    this.id = obj?.id || '',
    this.name = obj?.name || '',
    this.email = obj?.email || '',
    this.phone = obj?.phone || '',
    this.github = obj?.github || '',
    this.password = obj?.password || ''
  }
}
