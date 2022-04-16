import { Component, Output, EventEmitter } from '@angular/core';
import Paths from '../path';

import OverlayConfig, { Layout, Theme } from '../models/config.model';
import ConfigService from '../service/config.service';
import { version } from '../../version.json';

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
    fontSize: number;
    theme: Theme;
    autohide: number;
    version: string;
    partyLayout: Layout;
    allianceLayout: Layout;

    constructor(configService: ConfigService) {
        this.configService = configService;
        this.config = configService.getConfiguration();
        this.fontSize = this.config.fontSize;
        this.theme = this.config.theme;
        this.partyLayout = this.config.partyLayout;
        this.allianceLayout = this.config.allianceLayout;
        this.autohide = this.config.autohide;
        this.version = version;
    }

    getLayouts() {
        return Object.values(Layout);
    }

    getThemes() {
        return Object.values(Theme);
    }

    isActivePartyLayout(layout: Layout) {
        return this.partyLayout == layout;
    }

    isActiveAllianceLayout(layout: Layout) {
        return this.allianceLayout == layout;
    }

    isActiveTheme(theme: Theme) {
        return this.theme == theme;
    }

    setPartyLayout(layout: Layout) {
        this.partyLayout = layout;
    }

    setAllianceLayout(layout: Layout) {
        this.allianceLayout = layout;
    }

    setTheme(theme: Theme) {
        this.theme = theme;
    }

    setOptions() {
        this.config.fontSize = this.fontSize;
        this.config.theme = this.theme;
        this.config.partyLayout = this.partyLayout;
        this.config.allianceLayout = this.allianceLayout;
        this.config.autohide = this.autohide;
        this.configService.setConfig(this.config);
        this.onCloseRequested.emit();
    }
}