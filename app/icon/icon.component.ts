import { Component, Input } from '@angular/core';
import { Player } from '../models/player.model';
import { Configuration } from '../config';

@Component({
    selector: 'icon',
    templateUrl: Configuration.GetGlobalPath('icon.html'),
    styleUrls: [ Configuration.GetGlobalPath('icon.css') ]
})
export class IconComponent {
    @Input() iconName: string;
    @Input() iconSize: number;

    getIconSrc() {
        let iconPath = "icons/" + this.iconName + ".png";
        // console.log(iconPath);
        return iconPath;
    }
}