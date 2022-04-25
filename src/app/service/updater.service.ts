import { Injectable } from '@angular/core';

import { EventDispatcher } from './event.dispatcher';
import { IConfigService } from './config.service';

import { ActUpdate } from '../models/update.model';
import { IEncounter, Encounter } from '../models/encounter.model';
import { Player } from '../models/player.model';
import { OverlayConfig } from '../models/config.model';

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
    config: OverlayConfig;

    constructor(configService: IConfigService) {
        super();

        this.config = configService.getConfiguration();
        this.onEncounterUpdated = new EventDispatcher<OverlayUpdateEvent>();
    }
    
    updateEncounter(data: ActUpdate, encounter: Encounter) {
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
            players.forEach((p, i) => { p.dpsPercent = (p.dps * (100 / topDps)); p.rank = i + 1; });
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