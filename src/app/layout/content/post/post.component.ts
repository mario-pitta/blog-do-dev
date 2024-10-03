import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuillEditorBase, QuillModule } from 'ngx-quill';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Post } from 'src/app/core/models/Post';
import { PostService } from 'src/app/core/services/post/post.service';
import { AuthorService } from 'src/app/core/services/author/author.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as uuid from 'uuid';

import {
  EditorChangeContent,
  EditorChangeSelection,
  QuillEditorComponent,
} from 'ngx-quill';
import Quill from 'quill';
import Block from 'quill/blots/block';

Block.tagName = 'DIV';
Quill.register(Block, true);

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
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PostComponent {
  postService = inject(PostService);
  aRoute = inject(ActivatedRoute);

  form!: FormGroup;
  loading: boolean = true;

  router = inject(Router);
  authorService = inject(AuthorService);
  user = this.authorService.getLoggedUser();
  postId!: number;
  ngOnInit(): void {
    console.log('user: ', this.user);

    let postId;
    if (!isNaN(this.aRoute.snapshot.params['id'])) {
      postId = Number(this.aRoute.snapshot.params['id']);
    } else {
      postId = this.aRoute.snapshot.params['id'];
    }
    if (!postId) {
      this.createForm();
    } else {
      this.postId = postId;
      this.postService.getPost(postId).subscribe({
        next: (res) => {
          this.createForm(res[0]);
        },
        error: (err) => console.log(err),
        complete: () => console.log('complete'),
      });
    }
  }
  gerarNomeAleatorio() {
    return this.authorService.createRandomAuthor();
  }

  createForm(post?: Post) {
    console.log(post);
    this.form = new FormGroup({
      id: new FormControl(post?.id || uuid.v1(), [Validators.nullValidator]),
      title: new FormControl(post?.title || '', [Validators.required]),
      subtitle: new FormControl(post?.subtitle || '', [
        Validators.nullValidator,
      ]),
      content: new FormControl(post?.content || '', [Validators.required]),
      author: new FormControl(post?.author?.name || '', [
        Validators.nullValidator,
      ]),
      createdAt: new FormControl(post?.createdAt || '', [
        Validators.nullValidator,
      ]),
    });
    console.log('this.form: ', this.form);

    this.loading = false;
  }

  quillEditor!: QuillEditorBase;
  created($event: any) {
    this.quillEditor = $event;
    console.log('this.quillEditor: ', this.quillEditor);

    // this.quillEditor.theme.modules.toolbar
  }
  onClick() {
    let post: Post = {
      ...this.form.value,
      author: this.authorService.getLoggedUser(),
      createdAt: new Date(),
    };
    const req = this.postId
      ? this.postService.updatePost(post)
      :  this.postService.createPost(post);

    req.subscribe({
      next: (res) => {
        if (confirm('Post created!! Do you want to create another post?')) {
          this.form.reset();
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => console.log(err),
      complete: () => console.log('complete'),
    });
  }
}
