import { ActUpdateCombatant } from './update.model'

export class Player {
    name: string;
    class: string;
    dps: number;
    damage: number;
    deaths: number;
    critPercent: string;

    constructor(name: string) {
        this.name = name;
    }

    updatePlayer(data: ActUpdateCombatant) {
        this.dps = data.encdps;
        this.class = data.Job.toUpperCase();
        this.damage = data.damage;
        this.critPercent = data['crithit%'];
        this.deaths = data.deaths;
    }
}