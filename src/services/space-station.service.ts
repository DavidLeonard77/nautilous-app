import { Injectable } from '@angular/core';
import {
  StationResource,
  SpaceStation,
  StationComponent,
  ComponentPort,
  ComponentContainer,
  ResourceDelivery,
  ResourceContainer,
  StationPersonel
} from 'src/modals/space-station.type';

@Injectable()
export class SpaceStationService {

  spaceStation: SpaceStation;

  resourceContainers: ResourceContainer[];

  stationComponentList: string[];
  stationDeliveryList: string[];
  stationPersonelList: string[];

  private resources: StationResource[];

  constructor(
  ) {

    this.stationComponentList = [
      'Storage Containers',
      'Rec Room',
      'Potato Farm',
      'Oxygen Generation System mk.1',
      'Solar Array mk.1',
      'Fuel Cell'
    ];

    this.stationDeliveryList = [
      'NASA',
      'Space X'
    ];

    this.stationPersonelList = [
      'Electrical Engineer',
      'Botanical Scientist',
      'Station Medic'
    ];

    this.resources = [
      {
        type: 'electricity',
        label: 'Electricity',
        alt: 'El'
      },
      {
        type: 'water',
        label: 'Water',
        alt: 'H2O'
      },
      {
        type: 'oxygen',
        label: 'Oxygen',
        alt: 'O'
      },
      {
        type: 'carbondioxide',
        label: 'Carbon Dioxide',
        alt: 'CO2'
      },
      {
        type: 'hydrogen',
        label: 'Hydrogen',
        alt: 'H'
      },
      {
        type: 'nitrogen',
        label: 'Nitrogen',
        alt: 'N'
      },
      {
        type: 'magnesium',
        label: 'Magnesium',
        alt: 'Mg'
      },
      {
        type: 'calcium',
        label: 'Calcium',
        alt: 'Ca'
      },
      {
        type: 'potassium',
        label: 'Potassium',
        alt: 'K'
      },
      {
        type: 'protein',
        label: 'Protein',
        alt: 'PRO'
      },
      {
        type: 'carbohydrates',
        label: 'Carbohydrate',
        alt: 'Carb'
      },
      {
        type: 'fat',
        label: 'Fat',
        alt: 'Fat'
      },
      {
        type: 'vitamins',
        label: 'Vitamins',
        alt: 'Vit'
      },
      {
        type: 'minerals',
        label: 'Minerals',
        alt: 'Min'
      }
    ];

    this.resourceContainers = [];

    this.spaceStation = new SpaceStation('Super Station');

  }

  applyStationDelivery(delivery: ResourceDelivery): void {
    delivery.resourceContainers.forEach((deliveryContainer: ResourceContainer) => {
      this.resourceContainers = this.resourceContainers.map(
        (resourceContainer: ResourceContainer) => {

          if (resourceContainer.resource.type === deliveryContainer.resource.type) {
            resourceContainer.value += deliveryContainer.value;
            resourceContainer = this.capLevels(resourceContainer);
          }

          return resourceContainer;
        }
      );
    });
  }

  getStationDelivery(label: string): ResourceDelivery {

    let resourceDelivery: ResourceDelivery;

    switch (label) {

      case 'NASA':
        resourceDelivery = new ResourceDelivery(
          'NASA',
          this.resources.map((resource: StationResource) => {
            return new ResourceContainer(resource, 100);
          })
        );
      break;

      case 'Space X':
        resourceDelivery = new ResourceDelivery(
          'Space X',
          this.resources.map((resource: StationResource) => {
            return new ResourceContainer(resource, 50);
          })
        );
      break;

    default:
      break;
    }

    return resourceDelivery;

  }

  getStationPersonel(label: string): StationPersonel {
    let stationPersonel: StationPersonel;

    const globalPorts: ComponentPort[] = [
      new ComponentPort('water', -.1, [ this.applyVector ]),
      new ComponentPort('oxygen', -.21, [ this.applyVector ]),
      new ComponentPort('carbondioxide', .21, [ this.applyVector ]),
      new ComponentPort('nitrogen', -.01, [ this.applyVector ]),
      new ComponentPort('protein', -.1, [ this.applyVector ]),
      new ComponentPort('carbohydrates', -.2, [ this.applyVector ]),
      new ComponentPort('fat', -.1, [ this.applyVector ]),
      new ComponentPort('vitamins', -.05, [ this.applyVector ]),
      new ComponentPort('minerals', -.05, [ this.applyVector ])
    ];

    switch (label) {

      case 'Electrical Engineer':
        stationPersonel = new StationPersonel(
          'engineering',
          'Electrical Engineer',
          'EE',
          globalPorts
        );
      break;

      case 'Botanical Scientist':
        stationPersonel = new StationPersonel(
          'botanical',
          'Botanical Scientist',
          'BS',
          globalPorts
        );
      break;

      case 'Station Medic':
        stationPersonel = new StationPersonel(
          'medicine',
          'Station Medic',
          'SM',
          globalPorts
        );
      break;
    }

    return stationPersonel;
  }

  getStationConfig(label: string): StationComponent {

    let stationComponent: StationComponent;

    switch (label) {

      case 'Storage Containers':
        stationComponent = new StationComponent(
          'container',
          'Storage Containers',
          [],
          [
            new ComponentContainer('electricity', 1000, [ this.applyResourceMax ]),
            new ComponentContainer('water', 100, [ this.applyResourceMax ]),
            new ComponentContainer('oxygen', 100, [ this.applyResourceMax ]),
            new ComponentContainer('carbondioxide', 100, [ this.applyResourceMax ]),
            new ComponentContainer('hydrogen', 100, [ this.applyResourceMax ]),
            new ComponentContainer('nitrogen', 100, [ this.applyResourceMax ]),
            new ComponentContainer('magnesium', 100, [ this.applyResourceMax ]),
            new ComponentContainer('calcium', 100, [ this.applyResourceMax ]),
            new ComponentContainer('potassium', 100, [ this.applyResourceMax ]),
            new ComponentContainer('protein', 100, [ this.applyResourceMax ]),
            new ComponentContainer('carbohydrates', 100, [ this.applyResourceMax ]),
            new ComponentContainer('fat', 100, [ this.applyResourceMax ]),
            new ComponentContainer('vitamins', 100, [ this.applyResourceMax ]),
            new ComponentContainer('minerals', 100, [ this.applyResourceMax ])
          ]
        );
      break;

      case 'Rec Room':
        stationComponent = new StationComponent(
          'recreation',
          'Rec Room',
          [
            new ComponentPort('electricity', -.1, [ this.applyVector ]),
            new ComponentPort('water', -.1, [ this.applyVector ])
          ]
        );
      break;

      case 'Potato Farm':
        stationComponent = new StationComponent(
          'food',
          'Potato Farm',
          [
            new ComponentPort('electricity', -.2, [ this.applyVector ]),
            new ComponentPort('water', -.2, [ this.applyVector ]),
            new ComponentPort('oxygen', .1, [ this.applyVector ]),
            new ComponentPort('carbondioxide', -.1, [ this.applyVector ]),
            new ComponentPort('nitrogen', -.05, [ this.applyVector ]),
            new ComponentPort('magnesium', -.05, [ this.applyVector ]),
            new ComponentPort('calcium', -.05, [ this.applyVector ]),
            new ComponentPort('potassium', -.05, [ this.applyVector ]),
            new ComponentPort('protein', .2, [ this.applyVector ]),
            new ComponentPort('carbohydrates', .4, [ this.applyVector ]),
            new ComponentPort('fat', .1, [ this.applyVector ]),
            new ComponentPort('vitamins', .1, [ this.applyVector ]),
            new ComponentPort('minerals', .1, [ this.applyVector ])
          ]
        );
      break;

      case 'Oxygen Generation System mk.1':
        stationComponent = new StationComponent(
          'electrolysis',
          'Oxygen Generation System mk.1',
          [
            new ComponentPort('electricity', -.05, [ this.applyVector ]),
            new ComponentPort('water', -3, [ this.applyVector ]),
            new ComponentPort('oxygen', +2, [ this.applyVector ]),
            new ComponentPort('hydrogen', +1, [ this.applyVector ])
          ],
          [
            new ComponentContainer('water', 10, [ this.applyResourceMax ]),
            new ComponentContainer('oxygen', 10, [ this.applyResourceMax ]),
            new ComponentContainer('hydrogen', 10, [ this.applyResourceMax ]),
          ]
        );
      break;

      case 'Solar Array mk.1':
        stationComponent = new StationComponent(
          'generator',
          'Solar Array mk.1',
          [
            new ComponentPort('electricity', +1, [ this.applyVector ])
          ]
        );
      break;

      case 'Fuel Cell':
        stationComponent = new StationComponent(
          'fuelcell',
          'Fuel Cell',
          [
            new ComponentPort('electricity', +10, [ this.applyVector ]),
            new ComponentPort('oxygen', -.5, [ this.applyVector ]),
            new ComponentPort('hydrogen', -.5, [ this.applyVector ])
          ]
        );
      break;
    }

    return stationComponent;

  }

  applyVector?(resourceContainer: ResourceContainer, port: ComponentPort): ResourceContainer {
    resourceContainer.value += port.vector;
    return resourceContainer;
  }

  applyResourceMax?(resourceContainer: ResourceContainer, componentContainer: ComponentContainer): ResourceContainer {
    resourceContainer.max += componentContainer.max;
    return resourceContainer;
  }

  private capLevels(container: ResourceContainer): ResourceContainer {
    if (container.value < 0) {
      container.value = 0;
    }
    if (container.value > container.max) {
      container.value = container.max;
    }
    return container;
  }

  private checkComponentRequirements(component: StationComponent): StationComponent {

    let disabled = false;

    component.ports.forEach((port: ComponentPort) => {
      this.resourceContainers.forEach((container: ResourceContainer) => {
        if ((port.type === container.resource.type) && (port.vector < 0)) {
          disabled = container.value ? disabled : true;
        }
      });
    });

    component.disabled = disabled;
    return component;
  }

  private runPorts(components: StationComponent[]): StationComponent[] {

    return components.map((componentConfig: StationComponent) => {

      componentConfig = this.checkComponentRequirements(componentConfig);

      if (componentConfig.ports) {
        componentConfig.ports.forEach((port: ComponentPort) => {

          this.resourceContainers = this.resourceContainers.map((resourceContainer: ResourceContainer) => {
            if (resourceContainer.resource.type === port.type) {
              port.modifiers.forEach(modifier => {

                if (!componentConfig.disabled && componentConfig.active) {
                  resourceContainer = modifier(resourceContainer, port);
                }

                // level caps
                resourceContainer = this.capLevels(resourceContainer);

              });
            }
            return resourceContainer;
          });

        });
      }

      return componentConfig;
    });
  }

  private runContainers(components: StationComponent[]): StationComponent[] {

    this.resourceContainers.map((resourceContainer: ResourceContainer) => (resourceContainer.max = 0));

    return components.map((componentConfig: StationComponent) => {

      if (componentConfig.active && !componentConfig.disabled && componentConfig.containers) {
        componentConfig.containers.forEach((componentContainer: ComponentContainer) => {

          let exists: boolean;
          this.resourceContainers = this.resourceContainers.map((resourceContainer: ResourceContainer) => {
            if (resourceContainer.resource.type === componentContainer.type) {
              exists = true;
              componentContainer.modifiers.forEach(modifier => {
                resourceContainer = modifier(resourceContainer, componentContainer);
              });
            }
            return resourceContainer;
          });
          if (!exists) {
            this.resourceContainers.push(new ResourceContainer(
              this.resources.filter((resource: StationResource) => (resource.type === componentContainer.type))[0],
              0,
              componentContainer.max
            ));
          }

        });
      }

      return componentConfig;
    });

  }

  runComponents(): void {

    this.spaceStation.components = this.runContainers(this.spaceStation.components);
    this.spaceStation.components = this.runPorts(this.spaceStation.components);

  }

}
