import { Component, Input } from '@angular/core';
import { IConfigService } from 'src/app/service/config.service';
import { LayoutBase } from './layout.base';
import { Player } from 'src/app/models/player.model';

@Component({
    selector: 'player-detail-bars',
    templateUrl: 'player-detail-bars.component.html',
    styleUrls: ['player-detail-bars.component.scss']
})
export class PlayerDetailBarsComponent extends LayoutBase {
    @Input() players: Player[];

    constructor(configService: IConfigService) {
        super(configService);
        this.players = [];
    }
}
