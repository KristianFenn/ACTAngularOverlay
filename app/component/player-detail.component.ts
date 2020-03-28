import { Component, Input } from '@angular/core';
import Paths from '../path';

import Player from '../models/player.model';
import OverlayConfig from '../models/config.model';
import ConfigService from '../service/config.service';

@Component({
    selector: 'player-detail',
    templateUrl: Paths.GetHtml('player-detail'),
    styleUrls: [ 
        Paths.GetCss('common'),
        Paths.GetCss('player-detail')
    ]
})
export default class PlayerDetailComponent {
    @Input() players: Player[];
    config: OverlayConfig;

    constructor(configService: ConfigService) {
        this.config = configService.getConfiguration();
    }

    showBars() {
        return this.config.getCurrentLayout(this.players.length) == 'bars';
    }

    showTable() {
        return this.config.getCurrentLayout(this.players.length) == 'table';
    }
}