import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { faFaceFrown } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-right-container',
  standalone: true,
  imports: [NgIf, FontAwesomeModule],
  templateUrl: './right-container.component.html',
  styleUrl: './right-container.component.css',
})
export class RightContainerComponent {
  faThumbsUp: any = faThumbsUp;
  faThumbsDown: any = faThumbsDown;
  faFaceSmile: any = faFaceSmile;
  faFaceFrown: any = faFaceFrown;

  today: boolean = false;
  week: boolean = true;
  celsius: boolean = true;
  fahrenheit: boolean = false;

  OnTodayClick() {
    this.today = true;
    this.week = false;
  }
  OnWeekClick() {
    this.today = false;
    this.week = true;
  }
  onCelsiusClick() {
    this.celsius = true;
    this.fahrenheit = false;
  }

  onFahrenheitClick() {
    this.celsius = false;
    this.fahrenheit = true;
  }
}
