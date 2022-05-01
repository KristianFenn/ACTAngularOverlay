import { Component, Input } from '@angular/core';
import { LayoutBase } from './layout.base';
import { IConfigService } from 'src/app/service/config.service';
import { PlayerTableField, MainPlayerTableField, IconPlayerTableField, DeathsPlayerTableField } from 'src/app/models/player-table.model';
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
        
        this.tableFields = [
            new MainPlayerTableField(10, 'DPS', p => p.dps.toString(), this.mainPlayerName),
            new IconPlayerTableField(10, 'Class', p => p.class),
            new MainPlayerTableField(30, 'Player', p => p.name, this.mainPlayerName),
            new PlayerTableField(40, 'Max Hit', p => `${abbreviateNumber.transform(p.maxHitAmount)} - ${p.maxHitName}`),
            new DeathsPlayerTableField(10, 'Deaths')
        ];
    }
}
