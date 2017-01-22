import { Component, Input } from '@angular/core';
import { Player } from '../models/player.model';
import { Configuration } from '../config';

@Component({
    selector: 'class-icon',
    templateUrl: Configuration.GetGlobalPath('class-icon.html'),
    styleUrls: [ Configuration.GetGlobalPath('class-icon.css') ]
})
export class ClassIconComponent {
    @Input() playerClass: string;
    @Input() iconSize: number;

    getIconSrc() {
        return "icons/" + this.playerClass + ".png";
    }
}