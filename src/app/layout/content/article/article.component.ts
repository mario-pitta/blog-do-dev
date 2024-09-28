import { ToString } from './../../../../assets/server/node_modules/type-fest/source/internal/string.d';
import { CommonModule, JsonPipe } from '@angular/common';
import { Component, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Post } from 'src/app/core/models/Post';
import { PostService } from 'src/app/core/services/post/post.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [CommonModule, JsonPipe],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  content$!: Observable<Post | any>;
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
    this.content$ = this.postService
      .getPost(Number(this.aRoute.snapshot.params['id']))
      .pipe(
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


          return {
            ..._post,
             content: _post.content
          };
        })
      );
  }

  sanitize(url: string) {
    const safeUrl = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(url))
    console.log('safeUrl: ', safeUrl?.toString());

    return safeUrl;
  }

  ngOnDestroy(): void {}
}
