import { Injectable } from '@angular/core';

import { StationResourceService } from './station-resource.service';

import { SpaceStation } from 'src/modals/space-station.type';
import { ResourceContainer, StationResource } from 'src/modals/station-resource.type';
import { ComponentPort, StationComponent, ComponentPost, ComponentContainer } from 'src/modals/station-component.type';

@Injectable()
export class SpaceStationService {

  spaceStation: SpaceStation;

  resourceContainers: ResourceContainer[];

  stationComponentList: string[];
  stationDeliveryList: string[];
  stationPersonelList: string[];

  constructor(
    private stationResourceService: StationResourceService
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

    this.resourceContainers = [];

    this.spaceStation = new SpaceStation('Super Station', 2000);

  }

  private runPersonel(components: StationComponent[]): StationComponent[] {

    return components.map((component: StationComponent) => {

      if (component.posts.length) {
        component.posts = component.posts.map((post: ComponentPost) => {

          if (post.personel && post.personel.ports) {

            let portFault: boolean;
            let requiredContainerExists: boolean;
            post.personel.ports.forEach((port: ComponentPort) => {

              portFault = false;
              requiredContainerExists = false;
              this.resourceContainers = this.resourceContainers.map((container: ResourceContainer) => {

                if (container.resource.type === port.type) {
                  port.modifiers.forEach(modifier => container = modifier(container, port));


                  // level caps
                  container = this.stationResourceService.capLevels(container);

                  if ((port.vector < 0) && !container.value) {
                    portFault = true;
                  }
                }

                return container;
              });

              if (!requiredContainerExists) {
                portFault = true;
              }

              port.fault = portFault;

            });
          }

          return post;
        });

      }

      const filledPosts: number = component.posts.filter((post: ComponentPost) => post.personel).length;
      component.postFailure = (filledPosts !== component.posts.length) ? true : false;

      return component;
    });
  }

  private runPorts(components: StationComponent[]): StationComponent[] {

    return components.map((component: StationComponent) => {

      if (component.ports) {

        let portFault: boolean;
        let requiredContainerExists: boolean;
        component.ports.forEach((port: ComponentPort) => {

          portFault = false;
          requiredContainerExists = false;
          this.resourceContainers = this.resourceContainers.map((container: ResourceContainer) => {

            if (container.resource.type === port.type) {
              requiredContainerExists = true;
              port.modifiers.forEach(modifier => {
                if (!component.disabled && component.active) {
                  container = modifier(container, port);
                }
              });

              // level caps
              container = this.stationResourceService.capLevels(container);

              if ((port.vector < 0) && !container.value) {
                portFault = true;
              }
            }

            return container;
          });

          if (!requiredContainerExists) {
            portFault = true;
          }

          port.fault = portFault;

        });
      }

      component.portFailure = component.ports.filter((port: ComponentPort) => port.fault).length ? true : component.disabled;

      return component;
    });
  }

  private runContainers(components: StationComponent[]): StationComponent[] {

    this.resourceContainers = this.resourceContainers.map((resourceContainer: ResourceContainer) => {
      resourceContainer.max = 0;
      return resourceContainer;
    });

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
              this.stationResourceService.resources.filter((resource: StationResource) => (resource.type === componentContainer.type))[0],
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

    this.spaceStation.components.map((component: StationComponent) => {
      component.disabled = false;
      return component;
    });

    this.spaceStation.components = this.runContainers(this.spaceStation.components);
    this.spaceStation.components = this.runPersonel(this.spaceStation.components);
    this.spaceStation.components = this.runPorts(this.spaceStation.components);

    this.spaceStation.components.map((component: StationComponent) => {
      component.disabled = component.portFailure || component.postFailure;
      return component;
    });
  }

}
