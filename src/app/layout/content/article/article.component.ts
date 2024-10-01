import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { provideQuillConfig, QuillModule } from 'ngx-quill';
import { map, Observable } from 'rxjs';
import { Post } from 'src/app/core/models/Post';
import { AuthorService } from 'src/app/core/services/author/author.service';
import { PostService } from 'src/app/core/services/post/post.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe,
    MatButtonModule,
    MatIcon,
    ReactiveFormsModule,
    QuillModule,
    RouterLink
  ],
  providers: [],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  content$!: Observable<Post | any>;
  form!: FormGroup;

  constructor(
    private postService: PostService,
    private aRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    // this.router.events.subscribe(() => {
    //   if()
    // })
  }

  ngOnInit(): void {
    let postId;

    if (!isNaN(this.aRoute.snapshot.params['id'])) {
      postId = Number(this.aRoute.snapshot.params['id']);
    } else {
      postId = this.aRoute.snapshot.params['id'];
    }

    this.form = new FormGroup({
      content: new FormControl(''),
    });

    this.content$ = this.postService.getPost(postId).pipe(
      map((post) => {
        let _post = post[0];

        const div = document.createElement('div');
        div.innerHTML = _post.content;
        const imgs = div.getElementsByTagName('img');

        for (let i = 0; i < imgs.length; i++) {
          const img = imgs[i];
          img.setAttribute('loading', 'lazy');
          img.classList.add('img-fluid');
        }

        _post.comments = _post.comments?.map(comment => {
          const _div = document.createElement('div');
          _div.innerHTML = comment.content;
          const imgs = _div.getElementsByTagName('img');

          for (let i = 0; i < imgs.length; i++) {
            const img = imgs[i];
            img.setAttribute('loading', 'lazy');
            img.classList.add('img-fluid');
          }



          return {
            ...comment,
            content: _div.innerHTML
          }
        }) || [];


        return {
          ..._post,
          likes: _post.likes || 0,
          content: div.innerHTML,
        };
      })
    );
  }


  sanitize(url: string) {
    const safeUrl = this.sanitizer.sanitize(
      SecurityContext.RESOURCE_URL,
      this.sanitizer.bypassSecurityTrustResourceUrl(url)
    );
    console.log('safeUrl: ', safeUrl?.toString());

    return safeUrl;
  }
  likeArticle(post: Post) {
    post.likes += 1;
    console.log('post.likes: ', post.likes);

    this.postService
      .updatePost(post)
      .subscribe((post) => console.log('post: ', post));
  }

  unlikeArticle(post: Post) {
    post.likes -= 1;
    console.log('post.likes: ', post.likes);

    this.postService
      .updatePost(post)
      .subscribe((post) => console.log('post: ', post));
  }

  onComment(post: Post, comment: string) {
    post.comments.push({
      author: {
        id: 1,
        name: this.gerarNomeAleatorio()
      },
      createdAt: new Date(),
      content: comment,
    });

    this.postService
      .updatePost(post)
      .subscribe((post) => location.reload());
  }

  authorService = inject(AuthorService)
  gerarNomeAleatorio() {
    return this.authorService.createRandomAuthor()
  }

  ngOnDestroy(): void {}
}
