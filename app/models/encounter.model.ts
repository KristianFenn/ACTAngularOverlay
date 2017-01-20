import { Player } from './player.model';

export class Encounter {
    area: string;
    players: Array<Player>;

    constructor() {
        this.players = new Array<Player>();
    }
}