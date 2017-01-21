import { Component, Input } from '@angular/core';
import { Player } from '../models/player.model';
import { PlayerTableField } from '../models/player-table.model';

@Component({
    selector: 'player-header',
    templateUrl: 'app/player-header/player-header.html',
    styleUrls: [ 'app/player-header/player-header.css' ]
})
export class PlayerHeaderComponent {
    @Input() tableFields: PlayerTableField[];
}