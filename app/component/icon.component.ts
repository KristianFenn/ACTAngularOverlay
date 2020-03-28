import { Component, Input } from '@angular/core';
import Paths from '../path';

@Component({
    selector: 'icon',
    templateUrl: Paths.GetHtml('icon'),
    styleUrls: [ 
        Paths.GetCss('common'),
        Paths.GetCss('icon') 
    ]
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