import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class GameCycleService {

  timer;
  interval: number;
  value: number;
  day: number;

  pulse$: Observable<void>;
  pulseSubject: BehaviorSubject<void>;

  constructor(
  ) {

    this.pulseSubject = new BehaviorSubject(null);
    this.pulse$ = this.pulseSubject.asObservable();

    this.timer = null;
    this.interval = 1000;
    this.day = 0;
  }

  start(): void {
    console.log('running station components');
    if (this.timer !== null) {
      return;
    }
    this.timer = setInterval(() => {
      this.day++;
      this.pulseSubject.next(null);
    }, this.interval);
  }
  stop(): void {
    clearInterval(this.timer);
    this.timer = null;
  }

}
