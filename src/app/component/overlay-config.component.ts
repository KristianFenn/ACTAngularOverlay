import { Component, Output, EventEmitter } from '@angular/core';

import { OverlayConfig, Layout, Theme } from '../models/config.model';
import { ConfigService } from '../service/config.service';
import version from '../../version.json';

@Component({
    selector: 'overlay-config',
    templateUrl: 'overlay-config.component.html',
    styleUrls: [ 'overlay-config.component.scss' ]
})
export class OverlayConfigComponent {
    @Output() onCloseRequested: EventEmitter<any> = new EventEmitter();

    config: OverlayConfig;
    configService: ConfigService;
    fontSize: number;
    theme: Theme;
    autohide: number;
    versionNumber: string;
    versionDescription: string;
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
        this.versionNumber = version.version;
        this.versionDescription = version.description;
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