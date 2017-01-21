import { ActUpdateCombatant } from './update.model'

export class Player {
    name: string;
    class: string;
    dps: number;
    damage: number;

    constructor(name: string) {
        this.name = name;
    }

    updatePlayer(data: ActUpdateCombatant) {
        this.dps = data.encdps;
        this.class = data.Job;
        this.damage = data.damage;
    }
}