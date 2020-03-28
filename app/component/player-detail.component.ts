import { Component, Input } from '@angular/core';
import Player from '../models/player.model';
import PlayerTableField from '../models/player-table.model';
import Configuration, { Theme } from '../models/config.model';
import Paths from '../path';
import OverlayConfig from '../models/config.model';

@Component({
    selector: 'player-detail',
    templateUrl: Paths.GetHtml('player-detail'),
    styleUrls: [ 
        Paths.GetCss('common'),
        Paths.GetCss('player-detail')
    ]
})
export default class PlayerDetailComponent {
    @Input() player: Player;
    @Input() dpsPercentage: number;
    @Input() playerCount: number;
    @Input() config: OverlayConfig;

    showBars() {
        return this.config.getCurrentLayout(this.playerCount) == 'bars';
    }

    showTable() {
        return this.config.getCurrentLayout(this.playerCount) == 'table';
    }
}