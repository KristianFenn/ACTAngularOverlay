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
        this.encounter.area = data.Encounter.title;
        
        for (let combatant in data.Combatant) {
            let current: ActUpdateCombatant;
            current = data.Combatant[combatant];

            let playerToUpdate = this.encounter.players.find(player => player.name === current.name);

            if (playerToUpdate !== undefined) {
                console.log("old player");
                this.updatePlayer(current, playerToUpdate);
            } else {
                console.log("new player");
                let newPlayer = new Player(current.name);
                this.updatePlayer(current, newPlayer);
                this.encounter.players.push(newPlayer);
            }
        }

        this.encounter.players.sort((player) => player.dps);
        this.notifier.dispatch(this.encounter);
    }

    updatePlayer(data: ActUpdateCombatant, player: Player) {
        player.dps = data.encdps;
    }
}