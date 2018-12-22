import { Injectable } from '@angular/core';
import { StationResource, ResourceContainer } from 'src/modals/station-resource.type';
import { ComponentPort, ComponentContainer } from 'src/modals/station-component.type';

@Injectable()
export class StationResourceService {

  resources: StationResource[];

  constructor(
  ) {

    this.resources = [
      new StationResource('electricity', 'Electricity', 'El', 5),
      new StationResource('water', 'Water', 'H2O', 5),
      new StationResource('oxygen', 'Oxygen', 'O', 5),
      new StationResource('carbondioxide', 'Carbon Dioxide', 'CO2', 5),
      new StationResource('hydrogen', 'Hydrogen', 'H', 5),
      new StationResource('nitrogen', 'Nitrogen', 'N', 5),
      new StationResource('magnesium', 'Magnesium', 'Mg', 5),
      new StationResource('calcium', 'Calcium', 'Ca', 5),
      new StationResource('potassium', 'Potassium', 'K', 5),
      new StationResource('protein', 'Protein', 'PRO', 5),
      new StationResource('carbohydrates', 'Carbohydrate', 'Carb', 5),
      new StationResource('fat', 'Fat', 'Fat', 5),
      new StationResource('vitamins', 'Vitamins', 'Vit', 5),
      new StationResource('minerals', 'Minerals', 'Min', 5)
    ];
  }

  applyVector?(resourceContainer: ResourceContainer, port: ComponentPort): ResourceContainer {
    resourceContainer.value += port.vector;
    return resourceContainer;
  }

  applyResourceMax?(resourceContainer: ResourceContainer, componentContainer: ComponentContainer): ResourceContainer {
    resourceContainer.max += componentContainer.max;
    return resourceContainer;
  }

  capLevels(container: ResourceContainer): ResourceContainer {
    if (container.value < 0) {
      container.value = 0;
    }
    if (container.value > container.max) {
      container.value = container.max;
    }
    return container;
  }
}
