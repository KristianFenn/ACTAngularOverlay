import { Component, Input } from '@angular/core';
import { Player } from '../models/player.model';
import { OverlayConfig, Layout } from '../models/config.model';
import { ConfigService } from '../service/config.service';

@Component({
    selector: 'player-detail',
    templateUrl: 'player-detail.component.html',
    styleUrls: [ 'player-detail.component.scss' ]
})
export class PlayerDetailComponent {
    @Input() players: Player[];
    config: OverlayConfig;

    constructor(configService: ConfigService) {
        this.config = configService.getConfiguration();
        this.players = [];
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