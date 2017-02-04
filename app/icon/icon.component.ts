import { Component, Input } from '@angular/core';
import Player from '../models/player.model';
import Configuration from '../config';

@Component({
    selector: 'icon',
    templateUrl: Configuration.GetSharedPath('icon.html'),
    styleUrls: [ Configuration.GetSharedPath('icon.css') ]
})
export default class IconComponent {
    @Input() iconName: string;
    @Input() iconSize: number;
    @Input() float: string = 'none';
    @Input() margin: string = '-3px';

    getIconSrc() {
        let iconPath = "icons/" + this.iconName + ".png";
        return iconPath;
    }
}