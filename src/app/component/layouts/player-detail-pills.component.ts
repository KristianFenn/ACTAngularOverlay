import { Component, Input } from '@angular/core';
import { IConfigService } from 'src/app/service/config.service';
import { Player } from 'src/app/models/player.model';
import { LayoutBase } from './layout.base';

@Component({
    selector: 'player-detail-pills',
    templateUrl: 'player-detail-pills.component.html',
    styleUrls: ['player-detail-pills.component.scss']
})
export class PlayerDetailPillsComponent extends LayoutBase {
    @Input() players: Player[];

    constructor(configService: IConfigService) {
        super(configService);
        this.players = [];
    }
}
