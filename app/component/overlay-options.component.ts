import { Component, Input } from '@angular/core';
import Paths from '../path';

import OverlayConfig, { Layout, Layouts, Theme, Themes } from '../models/config.model';
import ConfigService from '../service/config.service';

@Component({
    selector: 'overlay-options',
    templateUrl: Paths.GetHtml('overlay-options'),
    styleUrls: [
        Paths.GetCss('common'),
        Paths.GetCss('overlay-options')
    ]
})
export default class OverlayOptionsComponent {
    @Input() config: OverlayConfig;
    configService: ConfigService;

    constructor(configService: ConfigService) {
        this.configService = configService;
    }

    getLayouts() {
        return Layouts;
    }

    getThemes() {
        return Themes;
    }

    isActiveLayout(layout: Layout) {
        return this.config.layout == layout;
    }

    isActiveTheme(theme: Theme) {
        return this.config.theme == theme;
    }

    setLayout(layout: Layout) {
        this.config.layout = layout;
    }

    setTheme(theme: Theme) {
        this.config.theme = theme;
    }

    setScale(scalePercent: number) {
        this.config.scale = scalePercent / 100;
    }

    reloadWithNewOptions() {
        this.configService.reloadWithConfiguration(this.config);
    }
}