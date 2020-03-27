import { ActUpdateCombatant } from './update.model';
import Configuration from '../config';

export default class Player {
    name: string;
    class: string;
    dps: number;
    damage: number;
    damageFormatted: string;
    deaths: number;
    misses: number;
    critPercent: string;
    maxhit: string;
    dpsPercent: number;
    hps: number;
    overhealPercent: string;
    rank: number;
    directHitPercent: string;
    critDirectHitPercent: string;

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
        this.damageFormatted = this.damage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.critPercent = data['crithit%'];
        this.deaths = data.deaths;
        this.maxhit = data.maxhit;
        this.misses = data.misses;
        this.hps = parsePerSecond(data.ENCHPS);
        this.overhealPercent = data.OverHealPct;
        this.critDirectHitPercent = data.CritDirectHitPct;
        this.directHitPercent = data.DirectHitPct;
    }
}