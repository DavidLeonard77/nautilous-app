export class ResourceContainer {
    constructor(
        public resource: StationResource,
        public value: number,
        public max?: number
    ) { }
}

export class StationResource {
    constructor(
        public type: string,
        public label: string,
        public alt: string,
        public cost: number
    ) { }
}
