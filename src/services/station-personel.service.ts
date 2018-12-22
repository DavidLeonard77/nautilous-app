import { Injectable } from '@angular/core';

import { SpaceStationService } from './space-station.service';
import { StationResourceService } from './station-resource.service';

import { ComponentPort, ComponentPost } from 'src/modals/station-component.type';
import { StationPersonel } from 'src/modals/station-personel.type';

@Injectable()
export class StationPersonelService {

  constructor(
    private spaceStationService: SpaceStationService,
    private stationResourceService: StationResourceService
  ) {
  }

  private fillComponentPost(post: ComponentPost, personel: StationPersonel): void {
    post.personel = personel;
    const personelIndex: number = this.spaceStationService.spaceStation.personel.indexOf(personel);
    this.spaceStationService.spaceStation.personel.splice(personelIndex, 1);
  }

  private clearComponentPost(post: ComponentPost): void {
    this.spaceStationService.spaceStation.personel.push(post.personel);
    post.personel = null;
  }

  assignStationPersonel(post: ComponentPost): void {

    if (!post.personel) {

      const qualifiedPersonel: StationPersonel[] = this.spaceStationService.spaceStation.personel.filter(
        (stationPersonel: StationPersonel) => (stationPersonel.type === post.type)
      );

      if (qualifiedPersonel.length) {

        this.fillComponentPost(post, qualifiedPersonel[0]);
      }

    } else {
      this.clearComponentPost(post);
    }

  }

  getStationPersonel(label: string): StationPersonel {
    let stationPersonel: StationPersonel;

    const globalPorts: ComponentPort[] = [
      new ComponentPort('water', -.1, [ this.stationResourceService.applyVector ]),
      new ComponentPort('oxygen', -.21, [ this.stationResourceService.applyVector ]),
      new ComponentPort('carbondioxide', .21, [ this.stationResourceService.applyVector ]),
      new ComponentPort('nitrogen', -.01, [ this.stationResourceService.applyVector ]),
      new ComponentPort('protein', -.1, [ this.stationResourceService.applyVector ]),
      new ComponentPort('carbohydrates', -.2, [ this.stationResourceService.applyVector ]),
      new ComponentPort('fat', -.1, [ this.stationResourceService.applyVector ]),
      new ComponentPort('vitamins', -.05, [ this.stationResourceService.applyVector ]),
      new ComponentPort('minerals', -.05, [ this.stationResourceService.applyVector ])
    ];

    switch (label) {

      case 'Electrical Engineer':
        stationPersonel = new StationPersonel(
          'ee',
          'Electrical Engineer',
          'EE',
          globalPorts
        );
      break;

      case 'Botanical Scientist':
        stationPersonel = new StationPersonel(
          'bs',
          'Botanical Scientist',
          'BS',
          globalPorts
        );
      break;

      case 'Station Medic':
        stationPersonel = new StationPersonel(
          'sm',
          'Station Medic',
          'SM',
          globalPorts
        );
      break;
    }

    return stationPersonel;
  }

}
