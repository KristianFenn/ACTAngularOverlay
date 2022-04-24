import { Component, Input } from '@angular/core';
import { LayoutBase } from './layout.base';
import { IConfigService } from 'src/app/service/config.service';
import { PlayerTableField } from 'src/app/models/player-table.model';
import { Player } from 'src/app/models/player.model';

@Component({
    selector: 'player-detail-table',
    templateUrl: 'player-detail-table.component.html',
    styleUrls: ['player-detail-table.component.scss']
})
export class PlayerDetailTableComponent extends LayoutBase {
    @Input() players: Player[];
    tableFields: PlayerTableField[];

    constructor(configService: IConfigService) {
        super(configService);

        this.players = [];

        this.tableFields = [
            new PlayerTableField(10, "DPS", (p) => p.dps, this.mainPlayerFn),
            new PlayerTableField(10, "Class", (p) => p.class, () => "", true),
            new PlayerTableField(30, "Player", (p) => p.name, this.mainPlayerFn),
            new PlayerTableField(40, "Highest Hit", (p) => p.maxhit, () => ""),
            new PlayerTableField(10, "Death", (p) => p.deaths, (p) => this.redTextFn(p.deaths))
        ];
    }

    private mainPlayerFn = (p: Player) => this.isMainPlayer(p)  ? 'main-player' : '';
    private redTextFn = (v: number) => v > 0 ? 'text-red' : '';
}
