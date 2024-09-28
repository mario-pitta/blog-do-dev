import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterOutlet],
  styleUrls: ['./content.component.scss'],
  templateUrl: './content.component.html'
})
export class ContentComponent {
  ngOnInit(): void {

  }
}
