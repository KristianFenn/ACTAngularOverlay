import { Component, Input } from '@angular/core';
import { Player } from '../models/player.model';
import { PlayerTableField } from '../models/player-table.model'

@Component({
    selector: 'player-detail',
    templateUrl: 'app/player-detail/player-detail.html',
    styleUrls: [ 'app/player-detail/player-detail.css' ]
})
export class PlayerDetailComponent {
    @Input() player: Player;
    @Input() tableFields: PlayerTableField[];

    getIconUrl() {
        return 'icons/Acn.png';
    }
}