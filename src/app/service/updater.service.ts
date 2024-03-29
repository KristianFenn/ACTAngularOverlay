import { Injectable } from '@angular/core';

import { EventDispatcher } from './event.dispatcher';

import { ActUpdate } from '../models/update.model';
import { IEncounter, Encounter } from '../models/encounter.model';
import { Player } from '../models/player.model';
import { IOverlayService } from './overlay.service';

const IGNORE_KEY = 'ABILITY_IGNORE';

export interface OverlayUpdateEvent {
    active: boolean;
    encounter: IEncounter;
}

export abstract class IUpdater {
    abstract onEncounterUpdated: EventDispatcher<OverlayUpdateEvent>;
    abstract updateEncounter(data: ActUpdate, encounter: IEncounter): void;
}

@Injectable()
export class Updater extends IUpdater {
    private encounter: Encounter;
    onEncounterUpdated: EventDispatcher<OverlayUpdateEvent>;
    lastDuration: string;

    constructor(overlayService: IOverlayService) {
        super();
        this.encounter = new Encounter();
        this.onEncounterUpdated = new EventDispatcher<OverlayUpdateEvent>();
        overlayService.onCombatUpdate.subscribe(data => this.updateEncounter(data));
        this.lastDuration = '';
    }
    
    updateEncounter(data: ActUpdate) {
        this.encounter.updateEncounter(data.Encounter);
        const players = new Array<Player>();

        for (const playerName in data.Combatant) {
            if (playerName == IGNORE_KEY) {
                continue;
            }

            const player = new Player(data.Combatant[playerName]);
            players.push(player);
        }

        if (players.length !== 0) {
            players.sort((a, b) => b.dps - a.dps);
            const topDps = players[0].dps;
            players.forEach(p => p.dpsPercent = (p.dps * (100 / topDps)));
        }

        this.encounter.players = players;
        let active = true;

        if (data.Encounter.duration !== this.lastDuration) {
            this.lastDuration = data.Encounter.duration;
        } else {
            active = false;
        }

        this.onEncounterUpdated.dispatch({ encounter: this.encounter, active });
    }
}