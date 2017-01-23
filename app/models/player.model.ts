import { ActUpdateCombatant } from './update.model'
import { Configuration } from '../config'

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
    overhealPercent: string;

    constructor(name: string) {
        this.name = name;
    }

    isMainPlayer() {
        return this.name.toLowerCase() === Configuration.PlayerName.toLowerCase();
    }
 
    updatePlayer(data: ActUpdateCombatant) {
        let parsePerSecond = (v: string) => v !== "∞" ? parseInt(v) : 0;

        this.dps = parsePerSecond(data.ENCDPS);
        this.class = data.Job.toUpperCase() || data.name.toUpperCase().replace(' ', '_');
        this.damage = data.damage;
        this.critPercent = data['crithit%'];
        this.deaths = data.deaths;
        this.maxhit = data.maxhit;
        this.misses = data.misses;
        this.hps = parsePerSecond(data.ENCHPS);
        this.overhealPercent = data.OverHealPct;
    }


}