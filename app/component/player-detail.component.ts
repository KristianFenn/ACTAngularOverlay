import { Component, Input } from '@angular/core';
import Paths from '../path';

import Player from '../models/player.model';
import OverlayConfig, { Layout } from '../models/config.model';
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
        return this.config.getCurrentLayout(this.players.length) == Layout.Bars;
    }

    showTable() {
        return this.config.getCurrentLayout(this.players.length) == Layout.Table;
    }

    showPills() {
        return this.config.getCurrentLayout(this.players.length) == Layout.Pills;
    }

    getThemeClass() {
        return `theme-${this.config.theme}`;
    }

    isMainPlayer(player: Player) {
        return this.config.isMainPlayer(player);
    }
}