import { Component, Input } from '@angular/core';
import Player from '../models/player.model';
import PlayerTableField from '../models/player-table.model';
import Configuration, { Theme } from '../config';
import Paths from '../path';

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
    @Input() showTable: boolean;
    tableFields = Configuration.TableFields;
    themeClass: string;

    constructor() {
        this.themeClass = Configuration.GetThemeClass();
    }
}