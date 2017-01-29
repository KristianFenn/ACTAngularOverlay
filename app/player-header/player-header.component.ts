import { Component, Input } from '@angular/core';
import Player from '../models/player.model';
import PlayerTableField from '../models/player-table.model';
import Configuration from '../config'

@Component({
    selector: 'player-header',
    templateUrl: Configuration.GetThemePath('player-header.html'),
    styleUrls: [ Configuration.GetThemePath('player-header.css') ]
})
export default class PlayerHeaderComponent {
    @Input() tableFields: PlayerTableField[];
}