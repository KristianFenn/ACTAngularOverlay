import { ActUpdateCombatant } from './update.model';
import { SummonerPetNames, ScholarPetNames, AllClasses } from './player.contants';

export class Player {
    name: string;
    class: string;
    dps: number;
    damage: number;
    damageFormatted: string;
    deaths: number;
    misses: number;
    critPercent: string;
    maxhit: string;
    maxhitamount: string;
    dpsPercent: number;
    hps: number;
    overhealPercent: string;
    rank: number;
    directHitPercent: string;
    critDirectHitPercent: string;

    constructor(data: ActUpdateCombatant) {
        this.name = data.name;
        this.class = (data.Job.toUpperCase() || data.name.toUpperCase()).replace(' ', '_');
        this.maxhitamount = "";
        this.dpsPercent = 0;
        this.rank = 0;
        
        // is this a pet?
        if (this.name.includes('(')) {
            var petName = this.name.split('(')[0].trim();

            if (SummonerPetNames.indexOf(petName) >= 0) {
                this.class = "Egi";
            } else if (ScholarPetNames.indexOf(petName) >= 0)
                this.class = "Fairy";
            else {
                this.class = "Chocobo";
            }
        }

        let parsePerSecond = (v: string) => v !== "∞" ? parseInt(v) : 0;
        this.dps = parsePerSecond(data.ENCDPS);
        this.damage = data.damage;
        this.damageFormatted = this.damage.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.critPercent = data['crithit%'];
        this.deaths = data.deaths;
        this.maxhit = `${data["MAXHIT-*"]} - ${data.maxhit.split('-')[0]}`;
        this.misses = data.misses;
        this.hps = parsePerSecond(data.ENCHPS);
        this.overhealPercent = data.OverHealPct;
        this.critDirectHitPercent = data.CritDirectHitPct;
        this.directHitPercent = data.DirectHitPct;

        if (AllClasses.indexOf(this.class) < 0) {
            console.error(`Unexpected class: ${this.class}`)
            this.class = "Unknown";
        }
    }
}