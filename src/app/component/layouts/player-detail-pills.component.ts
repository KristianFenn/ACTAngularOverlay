import { Component, Input } from '@angular/core';
import { IConfigService } from 'src/app/service/config.service';
import { LayoutBase } from './layout.base';
import { Player } from 'src/app/models/player.model';

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
