import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  isActive: boolean = false;
  headLine: string = "Fehler";
  @Input() message: string = "";
  timer1: any;
  timer2: any;

  show() {
    this.isActive = true;

    this.timer1 = setTimeout(() => {
      this.isActive = false;
    }, 5000);

    this.timer2 = setTimeout(() => {
      this.progressInactive();
    }, 5300);
  }

  close() {
    this.isActive = false;
    this.progressInactive();

    clearTimeout(this.timer1);
    clearTimeout(this.timer2);
  }

  progressInactive() {
    setTimeout(() => {
      this.isActive = false;
    }, 300);
  }

}
