import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Post } from 'src/app/core/models/Post';
import { PostService } from 'src/app/core/services/post/post.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  providers: [PostService],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent {
  posts$!: Observable<Post[]>;
  loading: boolean = true;
  constructor(private postService: PostService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.posts$ = this.postService.getPosts().pipe(
        map((posts) => {
          this.loading = false;
          console.log(this.loading);
          return posts.reverse();
        })
      );
    }, 1500);
  }




}
