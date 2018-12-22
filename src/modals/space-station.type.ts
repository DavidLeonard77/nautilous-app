import { StationComponent } from './station-component.type';
import { StationPersonel } from './station-personel.type';

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
