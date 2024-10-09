import { AuthorService } from 'src/app/core/services/author/author.service';
import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardActions } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { User } from 'src/app/core/models/Usuario';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    MatCardActions,
    MatButton,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  authorService = inject(AuthorService);
  loading: boolean = false;
  router = inject(Router);
  login() {
    this.loading = true;
    this.authorService.getAuthors().subscribe({
      next: (res: User[]) => {
        const user = res.find(
          (user) =>
            user.email === this.form.value.email &&
            user.password === this.form.value.password
        );
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.authorService.loggedUser.next(user);

          console.log('logado');
          setTimeout(() => {
            this.router.navigate(['/']);
            location.href = '/';
          }, 250);
        } else {
          alert('Invalid Email or Password');
        }
      },
      error: (err) => {
        console.log(err), alert('Invalid Email or Password');
      },
      complete: () => {
        console.log('complete');
        this.loading = false;
      },
    });
  }
}
