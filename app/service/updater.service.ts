import { Injectable } from '@angular/core';

import EventDispatcher from './event.dispatcher';
import ConfigService from './config.service';

import { ActUpdate, ActUpdateCombatant } from '../models/update.model';
import Encounter from '../models/encounter.model';
import Player from '../models/player.model';
import OverlayConfig from '../models/config.model';

@Injectable()
export default class Updater extends EventDispatcher<Encounter> {
    config: OverlayConfig;

    constructor(configService: ConfigService) {
        super();

        this.config = configService.getConfiguration();
    }
    
    updateEncounter(data: ActUpdate) {
        let encounter = new Encounter();
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
        this.dispatch(encounter);
    }
}