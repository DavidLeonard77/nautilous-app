export class SpaceStation {
    label: string;
    components: StationComponent[];
    personel: StationPersonel[];
    constructor(label: string) {
        this.label = label;
        this.components = [];
        this.personel = [];
    }
}

export interface StationResource {
    type: string;
    label: string;
    alt: string;
}

export class ResourceContainer {
    constructor(
        public resource: StationResource,
        public value: number,
        public max?: number
    ) { }
}

export class ResourceDelivery {
    constructor(
        public label: string,
        public resourceContainers: ResourceContainer[]
    ) { }
}

export class ComponentPort {
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

export class StationComponent {
    disabled: boolean;
    active: boolean;
    constructor(
        public type: string,
        public label: string,
        public ports?: ComponentPort[],
        public containers?: ComponentContainer[]
    ) { }
}

export class StationPersonel {
    constructor(
        public type: string,
        public label: string,
        public ports?: ComponentPort[]
    ) { }
}

