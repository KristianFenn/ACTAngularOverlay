import { Component, Input } from '@angular/core';
import Player from '../models/player.model';
import PlayerTableField from '../models/player-table.model'
import Configuration from '../config'

@Component({
    selector: 'player-detail',
    templateUrl: Configuration.GetThemePath('player-detail.html'),
    styleUrls: [ 
        Configuration.GetSharedPath('common.css'),
        Configuration.GetSharedPath('player-detail.css'),
        Configuration.GetThemePath('player-detail.css') 
    ]
})
export default class PlayerDetailComponent {
    @Input() player: Player;
    @Input() tableFields: PlayerTableField[];
    @Input() dpsPercentage: number;
}