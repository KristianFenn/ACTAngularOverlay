import { Player } from './player.model';
import { ActUpdateEncounter } from './update.model'

export class Encounter {
    area: string;
    duration: string;
    dps: number;
    maxhit: string;
    players: Array<Player>;

    constructor() {
        this.players = new Array<Player>();
    }

    updateEncounter(data: ActUpdateEncounter) {
        this.area = data.CurrentZoneName;
        this.duration = data.duration;
    }
}