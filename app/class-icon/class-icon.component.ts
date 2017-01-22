import { Component, Input } from '@angular/core';
import { Player } from '../models/player.model';

@Component({
    selector: 'class-icon',
    templateUrl: 'app/class-icon/class-icon.html',
    styleUrls: [ 'app/class-icon/class-icon.css' ]
})
export class ClassIconComponent {
    @Input() playerClass: string;

    getIconSrc() {
        return "icons/" + this.playerClass + ".png";
    }
}