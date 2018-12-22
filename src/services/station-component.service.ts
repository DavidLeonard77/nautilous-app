import { Injectable } from '@angular/core';

import { StationResourceService } from './station-resource.service';

import { ComponentContainer, StationComponent, ComponentPort, ComponentPost } from 'src/modals/station-component.type';

@Injectable()
export class StationComponentService {

  constructor(
    private stationResourceService: StationResourceService
  ) {
  }

  getStationConfig(label: string): StationComponent {

    let stationComponent: StationComponent;

    switch (label) {

      case 'Storage Containers':
        stationComponent = new StationComponent(
          'container',
          'Storage Containers',
          125,
          [],
          [
            new ComponentContainer('electricity', 1000, [ this.stationResourceService.applyResourceMax ]),
            new ComponentContainer('water', 100, [ this.stationResourceService.applyResourceMax ]),
            new ComponentContainer('oxygen', 100, [ this.stationResourceService.applyResourceMax ]),
            new ComponentContainer('carbondioxide', 100, [ this.stationResourceService.applyResourceMax ]),
            new ComponentContainer('hydrogen', 100, [ this.stationResourceService.applyResourceMax ]),
            new ComponentContainer('nitrogen', 100, [ this.stationResourceService.applyResourceMax ]),
            new ComponentContainer('magnesium', 100, [ this.stationResourceService.applyResourceMax ]),
            new ComponentContainer('calcium', 100, [ this.stationResourceService.applyResourceMax ]),
            new ComponentContainer('potassium', 100, [ this.stationResourceService.applyResourceMax ]),
            new ComponentContainer('protein', 100, [ this.stationResourceService.applyResourceMax ]),
            new ComponentContainer('carbohydrates', 100, [ this.stationResourceService.applyResourceMax ]),
            new ComponentContainer('fat', 100, [ this.stationResourceService.applyResourceMax ]),
            new ComponentContainer('vitamins', 100, [ this.stationResourceService.applyResourceMax ]),
            new ComponentContainer('minerals', 100, [ this.stationResourceService.applyResourceMax ])
          ],
          []
        );
      break;

      case 'Rec Room':
        stationComponent = new StationComponent(
          'recreation',
          'Rec Room',
          200,
          [
            new ComponentPort('electricity', -.1, [ this.stationResourceService.applyVector ]),
            new ComponentPort('water', -.1, [ this.stationResourceService.applyVector ])
          ],
          [],
          [
            new ComponentPost('sm')
          ]
        );
      break;

      case 'Potato Farm':
        stationComponent = new StationComponent(
          'food',
          'Potato Farm',
          400,
          [
            new ComponentPort('electricity', -.2, [ this.stationResourceService.applyVector ]),
            new ComponentPort('water', -.2, [ this.stationResourceService.applyVector ]),
            new ComponentPort('oxygen', .1, [ this.stationResourceService.applyVector ]),
            new ComponentPort('carbondioxide', -.1, [ this.stationResourceService.applyVector ]),
            new ComponentPort('nitrogen', -.05, [ this.stationResourceService.applyVector ]),
            new ComponentPort('magnesium', -.05, [ this.stationResourceService.applyVector ]),
            new ComponentPort('calcium', -.05, [ this.stationResourceService.applyVector ]),
            new ComponentPort('potassium', -.05, [ this.stationResourceService.applyVector ]),
            new ComponentPort('protein', .2, [ this.stationResourceService.applyVector ]),
            new ComponentPort('carbohydrates', .4, [ this.stationResourceService.applyVector ]),
            new ComponentPort('fat', .1, [ this.stationResourceService.applyVector ]),
            new ComponentPort('vitamins', .1, [ this.stationResourceService.applyVector ]),
            new ComponentPort('minerals', .1, [ this.stationResourceService.applyVector ])
          ],
          [],
          [
            new ComponentPost('bs')
          ]
        );
      break;

      case 'Oxygen Generation System mk.1':
        stationComponent = new StationComponent(
          'electrolysis',
          'Oxygen Generation System mk.1',
          400,
          [
            new ComponentPort('electricity', -.05, [ this.stationResourceService.applyVector ]),
            new ComponentPort('water', -3, [ this.stationResourceService.applyVector ]),
            new ComponentPort('oxygen', +2, [ this.stationResourceService.applyVector ]),
            new ComponentPort('hydrogen', +1, [ this.stationResourceService.applyVector ])
          ],
          [
            new ComponentContainer('water', 10, [ this.stationResourceService.applyResourceMax ]),
            new ComponentContainer('oxygen', 10, [ this.stationResourceService.applyResourceMax ]),
            new ComponentContainer('hydrogen', 10, [ this.stationResourceService.applyResourceMax ]),
          ],
          [
            new ComponentPost('ee')
          ]
        );
      break;

      case 'Solar Array mk.1':
        stationComponent = new StationComponent(
          'generator',
          'Solar Array mk.1',
          300,
          [
            new ComponentPort('electricity', +1, [ this.stationResourceService.applyVector ])
          ],
          [
            new ComponentContainer('electricity', 200, [ this.stationResourceService.applyResourceMax ])
          ],
          [
            new ComponentPost('ee')
          ]
        );
      break;

      case 'Fuel Cell':
        stationComponent = new StationComponent(
          'fuelcell',
          'Fuel Cell',
          600,
          [
            new ComponentPort('electricity', +10, [ this.stationResourceService.applyVector ]),
            new ComponentPort('oxygen', -.5, [ this.stationResourceService.applyVector ]),
            new ComponentPort('hydrogen', -.5, [ this.stationResourceService.applyVector ])
          ],
          [
            new ComponentContainer('electricity', 500, [ this.stationResourceService.applyResourceMax ])
          ],
          [
            new ComponentPost('ee'),
            new ComponentPost('ee')
          ]
        );
      break;
    }

    return stationComponent;

  }

}
