import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { LayoutRoutingModule } from './lauyout.routing';

const routes: Routes = [];

@Component({
  standalone: true,
  selector: 'app-layout',
  template: `
    <app-header></app-header>

    <router-outlet></router-outlet>
  `,
  imports: [HeaderComponent, RouterOutlet, LayoutRoutingModule],
})
export class LayoutComponent {}
