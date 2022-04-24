import { Component, Input } from '@angular/core';

@Component({
    selector: 'icon',
    templateUrl: 'icon.component.html',
    styleUrls: [ 'icon.component.scss' ]
})
export class IconComponent {
    @Input() iconName: string;
    @Input() iconSize: number;

    constructor() {
        this.iconName = "Unknown";
        this.iconSize = 1;
    }

    getIconSrc() {
        return `/assets/icons/${this.iconName}.png`;
    }

    getIconSize() {
        return `${this.iconSize}em`;
    }
}