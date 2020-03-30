import { Injectable } from '@angular/core';
import * as qs from 'query-string';

import OverlayConfig, { Themes, Layouts } from "../models/config.model";
import { QueryString } from "../models/queryString.model";
import { QueryEncoder } from '@angular/http';
import Player from '../models/player.model';

@Injectable()
export default class ConfigService {
    private static _currentConfig: OverlayConfig;

    getConfiguration(): OverlayConfig {
        if (ConfigService._currentConfig) {
            return ConfigService._currentConfig;
        }

        var queryString = this.getQueryString();
        var config = new OverlayConfig();

        if (queryString.layout) {
            let layout = Layouts.find(l => l.name == queryString.layout);
            if (layout) {
                config.layout = layout;
            } else {
                console.error(`Invalid layout '${queryString.layout}' specified in query string`);
            }
        }

        if (queryString.theme) {
            let theme = Themes.find(t => t.name == queryString.theme);
            if (theme) {
                config.theme = theme;
            } else {
                console.error(`Invalid theme '${queryString.theme}' specified in query string`);
            }
        }

        if (queryString.scale) {
            if (isNaN(queryString.scale)) {
                console.error(`Specified scale '${queryString.scale}' is not a number`);
            } else {
                config.scale = queryString.scale;
            }
        }

        if (queryString.test) {
            config.test = queryString.test;
        }

        if (queryString.playerName) {
            config.mainPlayerName = queryString.playerName;
        }

        ConfigService._currentConfig = config;

        return config;
    }

    setConfig(config: OverlayConfig) {
        var queryString: QueryString = {
            layout: config.layout.name,
            playerName: config.mainPlayerName,
            scale: config.scale,
            theme: config.theme.name,
            test: undefined
        };

        if (config.test) {
            queryString.test = config.test;
        }

        history.pushState(null, '', `?${qs.stringify(queryString)}`);
    }

    private getQueryString(): QueryString {
        return qs.parse(location.search) as any as QueryString;
    }
}