import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuillModule } from 'ngx-quill';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Post } from 'src/app/core/models/Post';
import { PostService } from 'src/app/core/services/post/post.service';
import { AuthorService } from 'src/app/core/services/author/author.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent {
  onClick() {
    let post: Post = {
      ...this.form.value,
      author: {
        id: 1,
        name: this.gerarNomeAleatorio()
      },
      createdAt: new Date(),
    };

    this.postService.createPost(post).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }

  postService = inject(PostService);

  form!: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      subtitle: new FormControl('', [Validators.nullValidator]),
      content: new FormControl('', [Validators.required]),
    });
  }
authorService = inject(AuthorService)
  gerarNomeAleatorio() {
    return this.authorService.createRandomAuthor()
  }
}
