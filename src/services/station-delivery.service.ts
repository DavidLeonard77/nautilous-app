import { Injectable } from '@angular/core';

import { SpaceStationService } from './space-station.service';
import { StationResourceService } from './station-resource.service';

import { ResourceDelivery } from 'src/modals/station-delivery.type';
import { ResourceContainer, StationResource } from 'src/modals/station-resource.type';

@Injectable()
export class StationDeliveryService {

  constructor(
    private spaceStationService: SpaceStationService,
    private stationResourceService: StationResourceService
  ) {
  }

  getStationDelivery(label: string): ResourceDelivery {

    let resourceDelivery: ResourceDelivery;

    switch (label) {

      case 'NASA':
        resourceDelivery = new ResourceDelivery(
          'NASA',
          500,
          this.stationResourceService.resources.map((resource: StationResource) => {
            return new ResourceContainer(resource, 100);
          })
        );
      break;

      case 'Space X':
        resourceDelivery = new ResourceDelivery(
          'Space X',
          400,
          this.stationResourceService.resources.map((resource: StationResource) => {
            return new ResourceContainer(resource, 50);
          })
        );
      break;

    default:
      break;
    }

    return resourceDelivery;

  }

  applyStationDelivery(delivery: ResourceDelivery): void {
    delivery.resourceContainers.forEach((deliveryContainer: ResourceContainer) => {
      this.spaceStationService.resourceContainers = this.spaceStationService.resourceContainers.map(
        (resourceContainer: ResourceContainer) => {

          if (resourceContainer.resource.type === deliveryContainer.resource.type) {
            resourceContainer.value += deliveryContainer.value;
            resourceContainer = this.stationResourceService.capLevels(resourceContainer);
          }

          return resourceContainer;
        }
      );
    });
  }

}
