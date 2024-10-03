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
  constructor() {}
  user: Usuario = new Usuario();
  form: FormGroup = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    github: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.nullValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.user = new Usuario(this.form.value);
    this.authorService.createAuthor(this.user).subscribe({
      next: (res) => {
        this.authorService
          .login(this.user.email as string, this.user.password as string)
          .subscribe({
            next: (_res) => {
              if (_res.length > 0) {
                console.log('_res: ', _res);

                localStorage.setItem('user', JSON.stringify(_res[0]));
                this.router.navigate(['/']);
              }
            },
          });
      },
    });
  }
}
