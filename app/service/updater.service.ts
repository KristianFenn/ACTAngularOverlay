import { Injectable } from '@angular/core';
import { Encounter } from '../models/encounter.model';
import { Player } from '../models/player.model';
import { ActUpdate, ActUpdateEncounter, ActUpdateCombatant } from '../models/update.model';
import { EventDispatcher } from '../lib/event.dispatcher';

@Injectable()
export class Updater {
    encounter: Encounter;
    notifier: EventDispatcher<Encounter>;

    constructor() {
        this.encounter = new Encounter();
        this.notifier = new EventDispatcher<Encounter>();
    }
    
    updateEncounter(data: ActUpdate) {
        this.encounter.updateEncounter(data.Encounter);
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
            topDps = players.length > 0 ? players[0].dps : 0;
            players.forEach((p) => p.dpsPercent = (p.dps * (100 / topDps)))
        }

        this.encounter.players = players;
        this.notifier.dispatch(this.encounter);
    }
}