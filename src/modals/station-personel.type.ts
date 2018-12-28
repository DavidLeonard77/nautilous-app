import { ComponentPort } from './station-component.type';

export class StationPersonel {
    status = 'recruit';
    constructor(
        public type: string,
        public label: string,
        public alt: string,
        public cost: number,
        public grad: number,
        public ports?: ComponentPort[]
    ) { }
}
