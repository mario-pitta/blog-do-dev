export class Author {
  id?: string | number;
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
  constructor(obj: {
    id?: string | number;
    name?: string;
    email?: string;
    phone?: string;
    website?: string;
  }) {
    this.id = obj.id;
    this.name = obj.name;
    this.email = obj.email;
    this.phone = obj.phone;
    this.website = obj.website;
  }
}
