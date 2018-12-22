import { ResourceContainer } from './station-resource.type';

export class ResourceDelivery {
    constructor(
        public label: string,
        public cost: number,
        public resourceContainers: ResourceContainer[]
    ) { }
}
