import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  newError(message: string) {
    console.log(0)
    this.message = message;
    this.show();
  }

  isActive: boolean = false;
  headLine: string = "Fehler";
  message: string = "";
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
