import { ActUpdateCombatant } from './update.model'

export class Player {
    name: string;
    class: string;
    dps: number;
    damage: number;
    deaths: number;
    misses: number;
    critPercent: string;
    maxhit: string;
    dpsPercent: number;
    hps: number;

    constructor(name: string) {
        this.name = name;
    }
 
    updatePlayer(data: ActUpdateCombatant) {
        this.dps = data.ENCDPS;
        this.class = data.Job.toUpperCase();
        this.damage = data.damage;
        this.critPercent = data['crithit%'];
        this.deaths = data.deaths;
        this.maxhit = data.maxhit;
        this.misses = data.misses;
        this.hps = data.ENCHPS;
    }
}