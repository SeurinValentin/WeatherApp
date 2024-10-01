import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faLocation } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faCloud } from '@fortawesome/free-solid-svg-icons';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
@Component({
  imports: [FontAwesomeModule],
  selector: 'app-left-container',
  templateUrl: './left-container.component.html',
  styleUrl: './left-container.component.css',
  standalone: true,
})
export class LeftContainerComponent {
  faMagnifyingGlass: any = faMagnifyingGlass;
  faLocation: any = faLocation;

  faCloud: any = faCloud;
  faCloudRain: any = faCloudRain;
}
