import { Routes } from "@angular/router"
import { AuthGuard } from "src/app/core/guards/auth.guard"


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
        path: 'profile',
        loadComponent: () => import('./author/author.component').then(m => m.AuthorComponent),
      },
      {
        canActivate: [AuthGuard],
        path: 'new-post',
        loadComponent: () => import('./post/post.component').then(m => m.PostComponent),
      },
      {
        canActivate: [AuthGuard],
        path: 'edit-post/:id/:title',
        loadComponent: () => import('./post/post.component').then(m => m.PostComponent),
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('../auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'signup',
    loadComponent: () => import('../auth/signup/signup.component').then(m => m.SignupComponent),
  }
  ,{
    path: '**',
    redirectTo: '404',
  }
]
