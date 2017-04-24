import { Component } from '@angular/core'
import Encounter from './models/encounter.model'
import Configuration from './config'

@Component({
    selector: 'overlay-options',
    templateUrl: Configuration.GetSharedPath('overlay-options.html'),
    styleUrls: [ 
        Configuration.GetSharedPath('common.css'),
        Configuration.GetSharedPath('overlay-options.css')
    ]
})
export default class OverlayOptionsComponent {
    layout: string;
    theme: string;

    constructor() {
        this.layout = Configuration.Layout;
        this.theme = Configuration.Theme;
    }

    getLayouts() {
        return Configuration.Layouts;
    }

    getThemes() {
        return  Configuration.Themes
    }

    isActiveLayout(layoutName: string) {
        return this.layout == layoutName;
    }

    isActiveTheme(themeName: string) {
        return this.theme == themeName;
    }

    setLayout(layoutName: string) {
        this.layout = layoutName;
    }

    setTheme(themeName: string) {
        this.theme = themeName;
    }

    reloadWithNewOptions() {
        Configuration.ReloadWithOptions(this.theme, this.layout);
    }
}