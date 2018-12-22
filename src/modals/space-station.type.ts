import { StationComponent } from './station-component.type';
import { StationPersonel } from './station-personel.type';

export class SpaceStation {
    label: string;
    components: StationComponent[];
    personel: StationPersonel[];
    wallet: number;
    constructor(
        label: string,
        wallet?: number
    ) {
        this.label = label;
        this.components = [];
        this.personel = [];
        this.wallet = wallet || 0;
    }
}
