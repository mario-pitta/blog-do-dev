import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardActions } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from 'src/app/core/models/Usuario';
import { AuthorService } from 'src/app/core/services/author/author.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardActions,
    MatButtonModule,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  authorService = inject(AuthorService);
  router = inject(Router);
  loading: boolean = false;
  user: Usuario = new Usuario();
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    github: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.nullValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor() {}

  onSubmit() {
    this.loading = true;
    this.user = new Usuario(this.form.value);
    delete this.user.id;
    this.authorService.createAuthor(this.user).subscribe({
      next: (res) => {
        localStorage.setItem('user', JSON.stringify(res));
        setTimeout(() => {
          this.router.navigate(['/']);
          location.href = '/';
        }, 250);
      },
      error: (err) => {
        console.log(err);
        alert('Something went wrong, please check the console to more details');
      },
      complete: () => {
        console.log('complete');
        this.loading = false;
      },
    });
  }
}
