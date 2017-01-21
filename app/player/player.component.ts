import { Component, Input } from '@angular/core';

import { Player } from '../models/player.model';

@Component({
    selector: 'player-detail',
    templateUrl: 'app/player/player.html'
})
export class PlayerComponent {
    @Input() player: Player;
}