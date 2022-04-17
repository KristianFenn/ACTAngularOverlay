import { ActUpdateEncounter } from './update.model';
import Player from './player.model';

export default class Encounter {
    area: string;
    duration: string;
    dps: number;
    maxhit: string;
    players: Array<Player>;

    constructor() {
        this.players = new Array<Player>();
        this.area = "";
        this.duration = "";
        this.dps = 0;
        this.maxhit = "";
    }

    updateEncounter(data: ActUpdateEncounter) {
        this.area = data.CurrentZoneName;
        this.duration = data.duration;
        this.dps = data.ENCDPS;
    }
}