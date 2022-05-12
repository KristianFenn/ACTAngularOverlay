import { Injectable } from '@angular/core';
import { OverlayAPI } from 'ffxiv-overlay-api';

import { EventDispatcher } from './event.dispatcher';

import { ActUpdate } from '../models/update.model';
import { IEncounter, Encounter } from '../models/encounter.model';
import { Player } from '../models/player.model';

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
    onEncounterUpdated: EventDispatcher<OverlayUpdateEvent>;
    private overlayApi: OverlayAPI;

    constructor() {
        super();
        this.onEncounterUpdated = new EventDispatcher<OverlayUpdateEvent>();

        this.overlayApi = new OverlayAPI();

        this.overlayApi.addListener('CombatData', data => {
          this.updateEncounter(data as any);
        });
    
        this.overlayApi.startEvent();
    }
    
    updateEncounter(data: ActUpdate) {
        const encounter = new Encounter();
        encounter.updateEncounter(data.Encounter);
        const players = new Array<Player>();
        let topDps = 0;

        for (const combatant in data.Combatant) {
            const current = data.Combatant[combatant];

            const player = new Player(current);
            players.push(player);
        }

        if (players.length !== 0) {
            players.sort((a, b) => b.dps - a.dps);
            topDps = players[0].dps;
            players.forEach(p => p.dpsPercent = (p.dps * (100 / topDps)));
        }

        encounter.players = players;

        let active = true;

        // compatibility with older overlay plugin
        if (data.isActive) {
            active = data.isActive == 'true';
        }

        this.onEncounterUpdated.dispatch({ encounter, active });
    }
}