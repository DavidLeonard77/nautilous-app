import { ComponentPort } from './station-component.type';

export class StationPersonel {
    constructor(
        public type: string,
        public label: string,
        public alt: string,
        public ports?: ComponentPort[]
    ) { }
}
