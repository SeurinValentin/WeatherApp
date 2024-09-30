import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RightContainerComponent } from './right-container/right-container.component';
import { LeftContainerComponent } from './left-container/left-container.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RightContainerComponent, LeftContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'WeatherApp';
}
