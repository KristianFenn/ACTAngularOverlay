import { Component, Input } from '@angular/core';
import Player from '../models/player.model';
import Paths from '../path';

@Component({
    selector: 'icon',
    templateUrl: Paths.GetHtml('icon.html'),
    styleUrls: [ Paths.GetCss('icon.css') ]
})
export default class IconComponent {
    @Input() iconName: string;
    @Input() iconSize: number;
    @Input() float: string = 'none';
    @Input() margin: string = '0px';

    getIconSrc() {
        let iconPath = "icons/" + this.iconName + ".png";
        return iconPath;
    }
}