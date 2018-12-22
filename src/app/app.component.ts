import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatIconRegistry, MatChipList } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { SpaceStationService } from 'src/services/space-station.service';
import { StationPersonelService } from 'src/services/station-personel.service';

import { ResourceContainer } from 'src/modals/station-resource.type';
import { ResourceDelivery } from 'src/modals/station-delivery.type';
import { StationDeliveryService } from 'src/services/station-delivery.service';
import { ComponentPost } from 'src/modals/station-component.type';
import { StationPersonel } from 'src/modals/station-personel.type';
import { StationComponentService } from 'src/services/station-component.service';
import { StationResourceService } from 'src/services/station-resource.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatChipList) chipList: MatChipList;

  timer;
  interval: number;
  value: number;
  day: number;

  displayedColumns: string[] = ['label', 'value', 'progress', 'max'];

  dataSource: MatTableDataSource<ResourceContainer>;

  constructor(
    private stationService: SpaceStationService,
    private stationPersonelService: StationPersonelService,
    private stationDeliveryService: StationDeliveryService,
    private stationComponentService: StationComponentService,
    public stationResourceService: StationResourceService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {

    iconRegistry.addSvgIcon('close', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-close-24px.svg'));
    iconRegistry.addSvgIcon('ports', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-settings_input_composite-24px.svg'));
    iconRegistry.addSvgIcon('personel-filled', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-account_circle-24px.svg'));
    iconRegistry.addSvgIcon('personel-vacant', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-account_circle-24px.svg'));

    this.timer = null;
    this.interval = 1000;
    this.day = 0;

    console.log(this.stationService.spaceStation);
  }


  ngOnInit(): void {
    console.log(this.stationService.spaceStation.components);


    // this.chipList.chipSelectionChanges.subscribe((matChipSelectionChange: MatChipSelectionChange) => {
    //   console.log(matChipSelectionChange);
    // });
  }

  selected(e): void {
    console.log(e);
  }

  addStationComponent(label: string): void {
    console.log(label);
    this.stationService.spaceStation.components.unshift(this.stationComponentService.getStationConfig(label));
    console.log(this.stationService.spaceStation);
  }

  addStationDelivery(index: number): void {
    const label: string = this.stationService.stationDeliveryList[index];
    const delivery: ResourceDelivery = this.stationDeliveryService.getStationDelivery(label);

    console.log(delivery);
    this.stationDeliveryService.applyStationDelivery(delivery);
    // this.stationService.stationDeliveryList.splice(index, 1);
    console.log(this.stationService.spaceStation);
  }

  addStationPersonel(index: number): void {
    const label: string = this.stationService.stationPersonelList[index];
    const personel: StationPersonel = this.stationPersonelService.getStationPersonel(label);

    console.log(personel);
    this.stationService.spaceStation.personel.unshift(personel);
    // this.stationService.stationPersonelList.splice(index, 1);
    console.log(this.stationService.spaceStation);
  }

  removeStationPersonel(index: number): void {
    this.stationService.spaceStation.personel.splice(index, 1);
  }

  assignStationPersonel(post: ComponentPost): void {
    this.stationPersonelService.assignStationPersonel(post);
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
