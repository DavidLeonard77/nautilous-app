import { Injectable } from '@angular/core';

import { GameCycleService } from './game-cycle.service';
import { SpaceStationService } from './space-station.service';

import { StationSponsor } from 'src/modals/station-sponsor.type';

@Injectable()
export class StationSponsorService {

  sponsors: StationSponsor[];
  selectedSponsor: StationSponsor;

  constructor(
    private gameCycleService: GameCycleService,
    private spaceStaionService: SpaceStationService
  ) {

    this.sponsors = [
      new StationSponsor(
        'republic',
        'United States',
        'USA',
        150,
        60
      ),
      new StationSponsor(
        'corporation',
        'Space X',
        'SpX',
        250,
        90
      )
    ];

    this.selectedSponsor = this.sponsors[0];

    this.gameCycleService.pulse$.subscribe(() => {
      console.log(this.gameCycleService.day % this.selectedSponsor.cycle);
      if (!(this.gameCycleService.day % this.selectedSponsor.cycle)) {
        this.spaceStaionService.spaceStation.wallet += this.selectedSponsor.investment;
      }
    });
  }

}
