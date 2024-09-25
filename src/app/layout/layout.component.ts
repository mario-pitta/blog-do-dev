import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';

@Component({
  standalone: true,
  selector: 'app-layout',
  template: ` <app-header></app-header> `,
  imports: [HeaderComponent],
})
export class LayoutComponent {}
