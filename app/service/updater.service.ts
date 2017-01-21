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
        this.encounter.players = [];

        for (let combatant in data.Combatant) {
            let current: ActUpdateCombatant;
            current = data.Combatant[combatant];

            let player = new Player(current.name);
            player.updatePlayer(current);
            this.encounter.players.push(player);
        }

        this.encounter.players.sort((player) => player.dps);
        this.notifier.dispatch(this.encounter);
    }
}