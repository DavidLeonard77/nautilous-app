import { Component, ViewChild, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource, MatSort, MatIconRegistry, MatChipList } from '@angular/material';

import { SpaceStationService } from 'src/services/space-station.service';
import { StationPersonelService } from 'src/services/station-personel.service';
import { StationComponentService } from 'src/services/station-component.service';
import { StationResourceService } from 'src/services/station-resource.service';
import { GameCycleService } from 'src/services/game-cycle.service';
import { StationDeliveryService } from 'src/services/station-delivery.service';
import { StationSponsorService } from 'src/services/station-sponsor.service';

import { ResourceContainer } from 'src/modals/station-resource.type';
import { ResourceDelivery } from 'src/modals/station-delivery.type';
import { ComponentPost } from 'src/modals/station-component.type';
import { StationPersonel } from 'src/modals/station-personel.type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatChipList) chipList: MatChipList;

  displayedColumns: string[] = ['label', 'value', 'progress', 'max'];
  dataSource: MatTableDataSource<ResourceContainer>;

  constructor(
    private stationService: SpaceStationService,
    private stationPersonelService: StationPersonelService,
    private stationDeliveryService: StationDeliveryService,
    private stationComponentService: StationComponentService,
    public stationSponsorService: StationSponsorService,
    public stationResourceService: StationResourceService,
    public gameCycleService: GameCycleService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {

    iconRegistry.addSvgIcon('close', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-close-24px.svg'));
    iconRegistry.addSvgIcon('ports', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-settings_input_composite-24px.svg'));
    iconRegistry.addSvgIcon('personel-filled', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/baseline-account_circle-24px.svg'));
    iconRegistry.addSvgIcon('personel-vacant', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/outline-account_circle-24px.svg'));

    console.log(this.stationService.spaceStation);
  }

  ngOnInit(): void {
    this.gameCycleService.pulse$.subscribe(() => {
      this.stationService.runComponents();
      this.updateResourcePanel();
      console.log(this.stationService.spaceStation);
    });
  }

  private updateResourcePanel(): void {
    this.dataSource = new MatTableDataSource(this.stationService.resourceContainers);
    this.dataSource.sort = this.sort;
  }

  selected(e): void {
    console.log(e);
  }

  addStationComponent(label: string): void {
    this.stationService.spaceStation.components.unshift(this.stationComponentService.getStationConfig(label));
  }

  addStationDelivery(index: number): void {
    const label: string = this.stationService.stationDeliveryList[index];
    const delivery: ResourceDelivery = this.stationDeliveryService.getStationDelivery(label);
    this.stationDeliveryService.applyStationDelivery(delivery);
  }

  addStationPersonel(index: number): void {
    const label: string = this.stationService.stationPersonelList[index];
    const personel: StationPersonel = this.stationPersonelService.getStationPersonel(label);
    this.stationService.spaceStation.personel.unshift(personel);
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
}
