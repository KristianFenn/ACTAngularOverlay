import { Component, Input, Output, EventEmitter } from '@angular/core';
import Paths from '../path';

import OverlayConfig, { Layout, Layouts, Theme, Themes } from '../models/config.model';
import ConfigService from '../service/config.service';

@Component({
    selector: 'overlay-config',
    templateUrl: Paths.GetHtml('overlay-config'),
    styleUrls: [
        Paths.GetCss('common'),
        Paths.GetCss('overlay-config')
    ]
})
export default class OverlayConfigComponent {
    @Output() onCloseRequested: EventEmitter<any> = new EventEmitter();

    config: OverlayConfig;
    configService: ConfigService;
    scalePercent: number;
    theme: Theme;
    layout: Layout;
    autohide: number;

    constructor(configService: ConfigService) {
        this.configService = configService;
        this.config = configService.getConfiguration();
        this.scalePercent = this.config.scale * 100;
        this.theme = this.config.theme;
        this.layout = this.config.layout;
        this.autohide = this.config.autohide;
    }

    getLayouts() {
        return Layouts;
    }

    getThemes() {
        return Themes;
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

    setOptions() {
        this.config.scale = this.scalePercent / 100;
        this.config.theme = this.theme;
        this.config.layout = this.layout;
        this.config.autohide = this.autohide;
        this.configService.setConfig(this.config);
        this.onCloseRequested.emit();
    }
}