import { ResourceContainer } from './station-resource.type';
import { StationPersonel } from './station-personel.type';

export class StationComponent {
    portFailure: boolean;
    postFailure: boolean;
    disabled: boolean;
    active: boolean;
    constructor(
        public type: string,
        public label: string,
        public cost: number,
        public ports: ComponentPort[],
        public containers: ComponentContainer[],
        public posts: ComponentPost[]
    ) { }
}

export class ComponentPort {
    fault: boolean;
    constructor(
        public type: string,
        public vector: number,
        public modifiers?: ((resource: ResourceContainer, port: ComponentPort) => (ResourceContainer))[]
    ) { }
}

export class ComponentContainer {
    constructor(
        public type: string,
        public max: number,
        public modifiers?: ((resource: ResourceContainer, container: ComponentContainer) => (ResourceContainer))[]
    ) { }
}

export class ComponentPost {
    constructor(
        public type: string,
        public personel?: StationPersonel
    ) { }
}
