import { Component, Input } from '@angular/core';
import { LayoutBase } from './layout.base';
import { IConfigService } from 'src/app/service/config.service';
import { PlayerTableField } from 'src/app/models/player-table.model';
import { Player } from 'src/app/models/player.model';
import { AbbreviateNumberPipe } from 'src/app/pipes/abbreviate-number.pipe';

@Component({
    selector: 'player-detail-table',
    templateUrl: 'player-detail-table.component.html',
    styleUrls: ['player-detail-table.component.scss']
})
export class PlayerDetailTableComponent extends LayoutBase {
    @Input() players: Player[];
    tableFields: PlayerTableField[];

    constructor(configService: IConfigService, abbreviateNumber: AbbreviateNumberPipe) {
        super(configService);

        this.players = [];
        
        const formatMaxHitFn = (p: Player) => `${abbreviateNumber.transform(p.maxHitAmount)} - ${p.maxHitName}`;
        const mainPlayerFn = (p: Player) => this.isMainPlayer(p)  ? 'main-player' : '';
        const redTextFn = (v: number) => v > 0 ? 'text-red' : '';

        this.tableFields = [
            new PlayerTableField(10, 'DPS', (p) => p.dps, mainPlayerFn),
            new PlayerTableField(10, 'Class', (p) => p.class, () => '', true),
            new PlayerTableField(30, 'Player', (p) => p.name, mainPlayerFn),
            new PlayerTableField(40, 'Highest Hit', formatMaxHitFn, () => ''),
            new PlayerTableField(10, 'Death', (p) => p.deaths, (p) => redTextFn(p.deaths))
        ];
    }
}
