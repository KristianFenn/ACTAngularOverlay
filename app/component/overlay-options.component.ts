import { Component } from '@angular/core';
import Encounter from '../models/encounter.model';
import Configuration, { Layout, Theme } from '../config';
import Paths from '../path';

@Component({
    selector: 'overlay-options',
    templateUrl: Paths.GetHtml('overlay-options'),
    styleUrls: [
        Paths.GetCss('common'),
        Paths.GetCss('overlay-options')
    ]
})
export default class OverlayOptionsComponent {
    scale: number;
    layout: Layout;
    theme: Theme;

    constructor() {
        this.layout = Configuration.Layout;
        this.theme = Configuration.Theme;
        this.scale = Configuration.Scale * 100;
    }

    getLayouts() {
        return [
            { name: "Bars", value: Layout.Bars }, 
            { name: "Table", value: Layout.Table }, 
            { name: "Auto", value: Layout.Auto }
        ];
    }

    getThemes() {
        return [
            { name: 'FFXIV', value: Theme.Ffxiv }, 
            { name: 'FFLOGS', value: Theme.Fflogs }
        ];
    }

    isActiveLayout(layout: Layout) {
        return this.layout == layout;
    }

    isActiveTheme(theme: Theme) {
        return this.theme == theme;
    }

    setLayout(layout: Layout) {
        this.layout = layout;
    }

    setTheme(theme: Theme) {
        this.theme = theme;
    }

    reloadWithNewOptions() {
        Configuration.ReloadWithOptions(this.theme, this.layout, this.scale * 0.01);
    }
}