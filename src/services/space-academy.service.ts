import { Injectable } from '@angular/core';

import { SpaceStationService } from './space-station.service';
import { StationPersonelService } from './station-personel.service';
import { MarketService } from './market.service';
import { GameCycleService } from './game-cycle.service';

import { StationPersonel } from 'src/modals/station-personel.type';

class SpaceCadet {
  enroll: number;
  grad: number;
  constructor(
    public personel: StationPersonel,
    day: number
  ) {
    this.enroll = day;
    this.grad = day + personel.grad;
  }
}

@Injectable()
export class SpaceAcademyService {

  academy: SpaceCadet[];

  constructor(
    private spaceStationService: SpaceStationService,
    private marketService: MarketService,
    private stationPersonelService: StationPersonelService,
    private gameCycleService: GameCycleService
  ) {
    this.academy = [];
    gameCycleService.pulse.subscribe((day: number) => {
      this.academy = this.academy.filter((cadet: SpaceCadet) => {
        if (cadet.grad + 1 === day) {
          cadet.personel.status = 'graduate';
          spaceStationService.spaceStation.personel.unshift(cadet.personel);
        } else {
          return true;
        }
      });
    });
  }

  purchaseRecruit(label: string): void {
    const personel: StationPersonel = this.stationPersonelService.getStationPersonel(label);
    if (personel.cost <= this.spaceStationService.spaceStation.wallet) {
      this.marketService.purchase(personel.cost);
      this.academy.unshift( new SpaceCadet(personel, this.gameCycleService.day) );
    }
  }

}
