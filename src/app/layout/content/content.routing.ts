import { Routes } from "@angular/router"


export const  routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./content.component').then(m => m.ContentComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./feed/feed.component').then(m => m.FeedComponent),
      },
      {
        path: 'article/:id/:title',
        loadComponent: () => import('./article/article.component').then(m => m.ArticleComponent),
      },
      {
        path: 'author/:id/:name',
        loadComponent: () => import('./author/author.component').then(m => m.AuthorComponent),
      },
      {
        path: 'new-post',
        loadComponent: () => import('./post/post.component').then(m => m.PostComponent),
      },
      {
        path: 'edit-post/:id/:title',
        loadComponent: () => import('./post/post.component').then(m => m.PostComponent),
      }
    ]
  }
]
