import { Component, Input } from '@angular/core';
import Paths from '../path';
import Path from '../path';

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

    getIconSrc() {
        return Path.GetIcon(this.iconName);
    }
}