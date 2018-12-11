import { Component, Input, Output, OnInit, EventEmitter, ElementRef, ViewChild } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-space-station',
  templateUrl: './space-station.component.html'
})

export class SpaceStationComponent implements OnInit {

  @Input() width: number;
  @Input() height: number;
  @Input() radius: number;
  @Input() thick: number;
  @Input() max: number;
  @Input() min: number;
  @Input() imageUrls: string[];
  @Input() value: number;

  @Output() dragStart = new EventEmitter<number>();
  @Output() dragEnd = new EventEmitter<number>();

  @ViewChild('handle') handleRef: ElementRef;

  arc;
  clip;

  clipPathData: string;
  arcPathData: string;

  xpos: number;
  ypos: number;

  private localAngleValue;
  private _value;

  dragging: boolean;

  constructor(
    public element: ElementRef
  ) { }

  ngOnInit(): void {

    this._value = this.value;
    this.localAngleValue = this.valueToRadians(this.value * 100);

    let host = d3.select(this.element.nativeElement);
    host = d3.selectAll('.round-slider-container');

    const drag = d3.drag()
      .on('start', this.dragStarted())
      .on('drag', this.dragged())
      .on('end', this.dragEnded());

    this.clip = d3.arc()
      .innerRadius(0)
      .outerRadius(this.radius + (this.thick / 2))
      .startAngle(Math.PI);

    this.xpos = 0;
    this.ypos = this.radius;

    this.arc = d3.arc()
      .innerRadius(this.radius - (this.thick / 2))
      .outerRadius(this.radius + (this.thick / 2))
      .startAngle(Math.PI);

    const goose = d3.selectAll('.handle');
    goose.call(drag);

    this.updateUI();
  }

  private dragged() {
    return () => {
      this.dragging = true;
      const coord = d3.mouse(this.handleRef.nativeElement);
      const dFromOrigin = Math.sqrt(Math.pow(coord[0], 2) + Math.pow(coord[1], 2));
      let alpha = Math.acos(coord[0] / dFromOrigin);
      alpha = coord[1] < 0 ? -alpha : alpha;
      this.localAngleValue = alpha;
      this._value = this.radiansToValue(alpha);
      const value = Math.floor(this._value);

      this.dragStart.next(value);
      console.log(value);

      this.updateUI();

      this.xpos = this.radius * Math.cos(alpha);
      this.ypos = this.radius * Math.sin(alpha);
    };
  }

  private dragStarted() {
    return () => {
      d3.event.sourceEvent.stopPropagation();
    };
  }

  private updateUI(): void {

    this.xpos = this.radius * Math.cos(this.localAngleValue);
    this.ypos = this.radius * Math.sin(this.localAngleValue);

    let arcAlpha = this.localAngleValue;
    if (this._value === 0) {
      arcAlpha = this.localAngleValue + (Math.PI / 2) + 0.001;
    } else if (this.xpos <= 0 && this.ypos >= 0) {
      arcAlpha = this.localAngleValue + (Math.PI / 2);
    } else {
      arcAlpha = (Math.PI * 2) + this.localAngleValue + (Math.PI / 2);
    }

    this.arcPathData = this.arc({ endAngle: arcAlpha });
    this.clipPathData = this.clip({ endAngle: arcAlpha });

  }

  private radiansToValue(radians: number): number {
    let value = radians - (Math.PI / 2);
    value = value * 180 / Math.PI;
    if (value < 0) {
      value += 360;
    }
    return Math.round(value / 360 * this.max);
  }

  private valueToRadians(value: number): number {
    let radiansValue = value * 2 * Math.PI / this.max;
    radiansValue = radiansValue + (Math.PI / 2);
    if (radiansValue > Math.PI) {
      radiansValue = -(2 * Math.PI) + radiansValue;
    }
    return radiansValue;
  }

  private dragEnded() {
    return () => {
      const coord = d3.mouse(this.handleRef.nativeElement);
      const radians = Math.atan2(coord[1], coord[0]);
      let value = this.radiansToValue(radians);
      value = Math.floor(value);
      this._value = value;
      this.dragging = false;
      this.dragEnd.next(value);
      console.log(value);
    };
  }

}
