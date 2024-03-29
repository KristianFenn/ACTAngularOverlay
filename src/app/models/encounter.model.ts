import { ActUpdateEncounter } from './update.model';
import { Player } from './player.model';

export interface IEncounter {
    area: string;
    duration: string;
    dps: number;
    players: Array<Player>;
}

export class Encounter {
    area: string;
    duration: string;
    dps: number;
    players: Array<Player>;

    constructor() {
        this.players = new Array<Player>();
        this.area = '';
        this.duration = '';
        this.dps = 0;
    }

    updateEncounter(data: ActUpdateEncounter) {
        this.area = data.CurrentZoneName;
        this.duration = data.duration;
        this.dps = data.ENCDPS;
    }
}