import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatIconRegistry } from '@angular/material';
import { SpaceStationService } from 'src/services/space-station.service';

import { StationResource, ResourceDelivery, ResourceContainer, StationPersonel } from 'src/modals/space-station.type';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  timer;
  interval: number;
  value: number;
  day: number;

  displayedColumns: string[] = ['label', 'value', 'progress', 'max'];

  dataSource: MatTableDataSource<ResourceContainer>;

  constructor(
    private stationService: SpaceStationService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {

    iconRegistry.addSvgIcon('close', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-close-24px.svg'));
    iconRegistry.addSvgIcon('ports', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-settings_input_composite-24px.svg'));

    this.timer = null;
    this.interval = 1000;
    this.day = 0;

    console.log(this.stationService.spaceStation);
  }


  ngOnInit(): void {
    console.log(this.stationService.spaceStation.components);
  }

  addStationComponent(label: string): void {
    console.log(label);
    this.stationService.spaceStation.components.unshift(this.stationService.getStationConfig(label));
    console.log(this.stationService.spaceStation);
  }

  addStationDelivery(index: number): void {
    const label: string = this.stationService.stationDeliveryList[index];
    const delivery: ResourceDelivery = this.stationService.getStationDelivery(label);

    console.log(delivery);
    this.stationService.applyStationDelivery(delivery);
    // this.stationService.stationDeliveryList.splice(index, 1);
    console.log(this.stationService.spaceStation);
  }

  addStationPersonel(index: number): void {
    const label: string = this.stationService.stationPersonelList[index];
    const personel: StationPersonel = this.stationService.getStationPersonel(label);

    console.log(personel);
    this.stationService.spaceStation.personel.unshift(personel);
    // this.stationService.stationPersonelList.splice(index, 1);
    console.log(this.stationService.spaceStation);
  }

  removeStationPersonel(index: number): void {
    this.stationService.spaceStation.personel.splice(index, 1);
  }

  removeStationComponent(index: number): void {
    this.stationService.spaceStation.components.splice(index, 1);
  }

  dragStart(event): void {
    console.log(event);
  }

  dragEnd(event): void {
    console.log(event);
  }

  private runComponents(): void {
    this.day++;
    this.stationService.runComponents();
    this.dataSource = new MatTableDataSource(this.stationService.resourceContainers);
    this.dataSource.sort = this.sort;
    console.log(this.stationService.spaceStation);
  }

  start(): void {
    console.log('running station components');
    if (this.timer !== null) {
      return;
    }
    this.timer = setInterval(() => {
      this.runComponents();
    }, this.interval);
  }
  stop(): void {
    clearInterval(this.timer);
    this.timer = null;
  }
}
