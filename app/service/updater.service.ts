import { Injectable } from '@angular/core';
import { ActUpdate, ActUpdateEncounter, ActUpdateCombatant } from '../models/update.model';
import Encounter from '../models/encounter.model';
import Player from '../models/player.model';
import EventDispatcher from './event.dispatcher';

@Injectable()
export default class Updater extends EventDispatcher<Encounter> {
    constructor() {
        super();
    }
    
    updateEncounter(data: ActUpdate) {
        let encounter = new Encounter();
        encounter.updateEncounter(data.Encounter);
        let players = new Array<Player>();
        let topDps = 0;

        for (let combatant in data.Combatant) {
            let current: ActUpdateCombatant;
            current = data.Combatant[combatant];

            let player = new Player(current.name);
            player.updatePlayer(current);
            players.push(player);
        }

        if (players.length !== 0) {
            players.sort((a, b) => b.dps - a.dps);
            topDps = players[0].dps;
            players.forEach((p, i) => { p.dpsPercent = (p.dps * (100 / topDps)); p.rank = i + 1; })
        }

        encounter.players = players;
        this.dispatch(encounter);
    }
}