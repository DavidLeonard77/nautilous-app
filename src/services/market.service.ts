import { Injectable } from '@angular/core';
import { StationComponent } from 'src/modals/station-component.type';
import { SpaceStationService } from './space-station.service';

@Injectable()
export class MarketService {

  constructor(
    private spaceStationService: SpaceStationService
  ) {
  }

  purchase(cost: number): void {
    this.spaceStationService.spaceStation.wallet -= cost;
  }

}
