import { Component, Input } from '@angular/core';
import Player from '../models/player.model';
import PlayerTableField from '../models/player-table.model';
import Configuration from '../config';
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
    @Input() showTable: boolean;
    tableFields = Configuration.TableFields;
}