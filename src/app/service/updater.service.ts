import { Injectable } from '@angular/core';

import { EventDispatcher } from './event.dispatcher';
import { IConfigService } from './config.service';

import { ActUpdate, ActUpdateCombatant } from '../models/update.model';
import { Encounter } from '../models/encounter.model';
import { Player } from '../models/player.model';
import { OverlayConfig } from '../models/config.model';

export interface OverlayUpdateEvent {
    active: boolean;
    encounter: Encounter;
}

@Injectable()
export class Updater extends EventDispatcher<OverlayUpdateEvent> {
    config: OverlayConfig;

    constructor(configService: IConfigService) {
        super();

        this.config = configService.getConfiguration();
    }
    
    updateEncounter(data: ActUpdate, encounter: Encounter) {
        encounter.updateEncounter(data.Encounter);
        let players = new Array<Player>();
        let topDps = 0;

        for (let combatant in data.Combatant) {
            let current: ActUpdateCombatant;
            current = data.Combatant[combatant];

            let player = new Player(current);
            players.push(player);
        }

        if (players.length !== 0) {
            players.sort((a, b) => b.dps - a.dps);
            topDps = players[0].dps;
            players.forEach((p, i) => { p.dpsPercent = (p.dps * (100 / topDps)); p.rank = i + 1; })
        }

        encounter.players = players;

        let active = true;

        // compatibility with older overlay plugin
        if (data.isActive) {
            active = data.isActive == 'true';
        }

        this.dispatch({ encounter, active });
    }
}