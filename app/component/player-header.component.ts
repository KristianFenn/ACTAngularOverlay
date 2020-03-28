import { Component, Input } from '@angular/core';
import Player from '../models/player.model';
import PlayerTableField from '../models/player-table.model';
import Configuration from '../models/config.model';
import Paths from '../path';

@Component({
    selector: 'player-header',
    templateUrl: Paths.GetHtml('player-header'),
    styleUrls: [
        Paths.GetCss('common'),
        Paths.GetCss('player-header')
    ]
})
export default class PlayerHeaderComponent {
    @Input() playerCount: number;
    @Input() config: Configuration;

    showBars() {
        return this.config.getCurrentLayout(this.playerCount) == 'bars';
    }

    showTable() {
        return this.config.getCurrentLayout(this.playerCount) == 'table';
    }
}