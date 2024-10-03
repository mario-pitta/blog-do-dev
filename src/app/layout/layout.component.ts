import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { LayoutRoutingModule } from './lauyout.routing';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [];

@Component({
  standalone: true,
  selector: 'app-layout',
  template: `
    <app-header></app-header>

    <router-outlet></router-outlet>

    <app-footer></app-footer>
  `,
  imports: [HeaderComponent, RouterOutlet, LayoutRoutingModule, FooterComponent],
})
export class LayoutComponent {}
