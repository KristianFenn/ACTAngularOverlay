import Updater from '../service/updater.service'
import { Component } from '@angular/core'
import Encounter from '../models/encounter.model'
import Configuration from '../config'

@Component({
    selector: 'overlay-header',
    templateUrl: Configuration.GetSharedPath('overlay-header.html'),
    styleUrls: [
        Configuration.GetSharedPath('common.css'),
        Configuration.GetSharedPath('overlay-header.css')
    ]
})
export default class OverlayHeaderComponent {
    duration: string;
    totalDps: number;
    area: string;

    constructor(updater: Updater) {
        this.duration = '00:00';
        this.totalDps = 0;
        this.area = 'Loading...';

        updater.subscribe((data) => {
            this.duration = data.duration;
            this.totalDps = data.dps;
            this.area = data.area;
        });
    }

    setLayout(layoutName: string) {
        Configuration.SetLayout(layoutName);
    }

    setTheme(themeName: string) {
        Configuration.SetTheme(themeName);
    }
}