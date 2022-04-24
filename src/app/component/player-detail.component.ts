import { Component, Input } from '@angular/core';
import { Player } from '../models/player.model';
import { Layout, Theme } from '../models/config.model';
import { IConfigService } from '../service/config.service';

@Component({
    selector: 'player-detail',
    templateUrl: 'player-detail.component.html',
    styleUrls: [ 'player-detail.component.scss' ]
})
export class PlayerDetailComponent {
    @Input() players: Player[];
    configService: IConfigService;
    theme: Theme;

    constructor(configService: IConfigService) {
        this.configService = configService;
        this.players = [];
        
        const config = this.configService.getConfiguration();
        this.theme = config.theme;
        
        configService.onConfigChanged.subscribe(
            conf => this.theme = conf.theme);
    }

    showBars() {
        return this.configService.getCurrentLayout(this.players.length) == Layout.Bars;
    }

    showTable() {
        return this.configService.getCurrentLayout(this.players.length) == Layout.Table;
    }

    showPills() {
        return this.configService.getCurrentLayout(this.players.length) == Layout.Pills;
    }

    getThemeClass() {
        return `theme-${this.theme}`;
    }
}