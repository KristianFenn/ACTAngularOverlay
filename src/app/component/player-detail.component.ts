import { Component, Input } from '@angular/core';
import { Player } from '../models/player.model';
import { OverlayConfig, Layout } from '../models/config.model';
import { IConfigService } from '../service/config.service';
import { PlayerTableField } from '../models/player-table.model';

@Component({
    selector: 'player-detail',
    templateUrl: 'player-detail.component.html',
    styleUrls: [ 'player-detail.component.scss' ]
})
export class PlayerDetailComponent {
    @Input() players: Player[];
    config: OverlayConfig;
    configService: IConfigService;
    tableFields: PlayerTableField[];

    constructor(configService: IConfigService) {
        this.config = configService.getConfiguration();
        this.configService = configService;
        this.players = [];

        this.tableFields = [
            new PlayerTableField(10, "DPS", (p) => p.dps, this.mainPlayerFn),
            new PlayerTableField(10, "Class", (p) => p.class, () => "", true),
            new PlayerTableField(30, "Player", (p) => p.name, this.mainPlayerFn),
            new PlayerTableField(40, "Highest Hit", (p) => p.maxhit, () => ""),
            new PlayerTableField(10, "Death", (p) => p.deaths, (p) => this.redTextFn(p.deaths))
        ];
    }

    private mainPlayerFn = (p: Player) => this.configService.isMainPlayer(p)  ? 'main-player' : '';
    private redTextFn = (v: number) => v > 0 ? 'text-red' : '';

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
        return `theme-${this.config.theme}`;
    }

    isMainPlayer(player: Player) {
        return this.configService.isMainPlayer(player);
    }
}