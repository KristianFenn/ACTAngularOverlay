import { Component, Input } from '@angular/core';
import Paths from '../path';

import Player from '../models/player.model';
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
    @Input() players: Player[];
    @Input() dpsPercentage: number;
    @Input() config: OverlayConfig;

    showBars() {
        return this.config.getCurrentLayout(this.players.length) == 'bars';
    }

    showTable() {
        return this.config.getCurrentLayout(this.players.length) == 'table';
    }
}