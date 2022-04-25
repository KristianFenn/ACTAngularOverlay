import { ActUpdateCombatant } from './update.model';
import { SummonerPetNames, ScholarPetNames, AllClasses } from './player.contants';

export class Player {
    name: string;
    class: string;
    dps: number;
    damage: number;
    deaths: number;
    critPercent: string;
    maxHitName: string;
    maxHitAmount: number;
    dpsPercent: number;
    hps: number;
    overhealPercent: string;
    directHitPercent: string;
    critDirectHitPercent: string;

    constructor(data: ActUpdateCombatant) {
        this.name = data.name;
        this.class = (data.Job.toUpperCase() || data.name.toUpperCase()).replace(' ', '_');
        this.dpsPercent = 0;
        
        // is this a pet?
        if (this.name.includes('(')) {
            const petName = this.name.split('(')[0].trim();

            if (SummonerPetNames.find(n => n == petName)) {
                this.class = 'Egi';
            } else if (ScholarPetNames.find(n => n == petName))
                this.class = 'Fairy';
            else {
                this.class = 'Chocobo';
            }
        }

        // Damage
        const parsePossibleInf = (v: string) => v !== '∞' ? parseInt(v) : 0;
        this.dps = parsePossibleInf(data.ENCDPS);
        this.damage = data.damage;
        
        const maxhitSplit = data.maxhit.split('-');
        this.maxHitName = maxhitSplit[0];
        this.maxHitAmount = parseInt(maxhitSplit[1]);
        this.deaths = data.deaths;

        // Healing
        this.hps = parsePossibleInf(data.ENCHPS);
        this.overhealPercent = data.OverHealPct;

        // Crits
        this.critPercent = data['crithit%'];
        this.critDirectHitPercent = data.CritDirectHitPct;
        this.directHitPercent = data.DirectHitPct;

        if (AllClasses.indexOf(this.class) < 0) {
            console.error(`Unexpected class: ${this.class}`);
            this.class = 'Unknown';
        }
    }
}