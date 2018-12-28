import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class GameCycleService {

  timer;
  interval: number;
  value: number;
  day: number;

  pulse$: Observable<number>;
  pulse: BehaviorSubject<number>;

  constructor(
  ) {

    this.pulse = new BehaviorSubject(null);
    this.pulse$ = this.pulse.asObservable();

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
      this.pulse.next(this.day);
    }, this.interval);
  }
  stop(): void {
    clearInterval(this.timer);
    this.timer = null;
  }

}
