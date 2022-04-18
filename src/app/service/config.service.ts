import { Injectable } from '@angular/core';
import * as qs from 'query-string';

import { OverlayConfig, Theme, Layout } from "../models/config.model";
import { QueryString } from "../models/queryString.model";
import { EventDispatcher } from './event.dispatcher';

@Injectable()
export class ConfigService {
    private static _currentConfig: OverlayConfig;
    onConfigChanged: EventDispatcher<OverlayConfig>;

    constructor() {
        this.onConfigChanged = new EventDispatcher<OverlayConfig>();
    }

    getConfiguration(): OverlayConfig {
        if (ConfigService._currentConfig) {
            return ConfigService._currentConfig;
        }

        var config = this.parseConfigFromQs();

        ConfigService._currentConfig = config;

        return config;
    }

    private parseConfigFromQs() {
        var queryString = this.getQueryString();
        var config = new OverlayConfig();

        if (queryString.partyLayout) {
            if (Object.values<string>(Layout).includes(queryString.partyLayout)) {
                config.partyLayout = <Layout>queryString.partyLayout;
            }
            else {
                console.error(`Invalid layout '${queryString.partyLayout}' specified in query string`);
            }
        }

        if (queryString.allianceLayout) {
            if (Object.values<string>(Layout).includes(queryString.allianceLayout)) {
                config.allianceLayout = <Layout>queryString.allianceLayout;
            }
            else {
                console.error(`Invalid layout '${queryString.allianceLayout}' specified in query string`);
            }
        }

        if (queryString.theme) {
            if (Object.values<string>(Theme).includes(queryString.theme)) {
                config.theme = <Theme>queryString.theme;
            }
            else {
                console.error(`Invalid theme '${queryString.theme}' specified in query string`);
            }
        }

        if (queryString.fontSize) {
            let fontSize = parseInt(queryString.fontSize);

            if (isNaN(fontSize)) {
                console.error(`Specified font size '${queryString.fontSize}' is not a number`);
            }
            else {
                config.fontSize = fontSize;
            }
        }

        if (queryString.test) {
            config.test = queryString.test;
        }

        if (queryString.playerName) {
            config.mainPlayerName = queryString.playerName;
        }

        if (queryString.autohide) {
            let autoHide = parseInt(queryString.autohide);

            if (isNaN(autoHide)) {
                console.error(`Specified autohide interval '${queryString.fontSize}' is not a number`);
            } else {
                config.autohide = autoHide;
            }
        }

        return config;
    }

    setConfig(config: OverlayConfig) {
        var queryString: QueryString = {
            partyLayout: config.partyLayout,
            allianceLayout: config.allianceLayout,
            playerName: config.mainPlayerName,
            fontSize: config.fontSize.toString(),
            theme: config.theme,
            test: undefined,
            autohide: config.autohide.toString()
        };

        if (config.test) {
            queryString.test = config.test;
        }

        history.pushState(null, '', `?${qs.stringify(queryString)}`);

        ConfigService._currentConfig = config;

        this.onConfigChanged.dispatch(config);
    }

    private getQueryString(): QueryString {
        return qs.parse(location.search) as any as QueryString;
    }
}