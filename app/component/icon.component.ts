import { Component, Input } from '@angular/core';
import Path from '../path';

@Component({
    selector: 'icon',
    templateUrl: Path.GetHtml('icon'),
    styleUrls: [ 
        Path.GetCss('common'),
        Path.GetCss('icon') 
    ]
})
export default class IconComponent {
    @Input() iconName: string;
    @Input() iconSize: number;

    getIconSrc() {
        return Path.GetIcon(this.iconName);
    }
}