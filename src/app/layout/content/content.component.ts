import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ScrollingModule} from '@angular/cdk/scrolling';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterOutlet, ScrollingModule],
  styleUrls: ['./content.component.scss'],
  templateUrl: './content.component.html'
})
export class ContentComponent {
  ngOnInit(): void {

  }
}
