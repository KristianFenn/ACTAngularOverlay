import * as qs from 'query-string';
import { Injectable } from '@angular/core';

import { OverlayConfig, Theme, Layout } from '../models/config.model';
import { QueryString } from '../models/queryString.model';
import { EventDispatcher } from './event.dispatcher';
import { IOverlayService } from './overlay.service';

const AutoSizeThreshold = 10;

export abstract class IConfigService {
    abstract onConfigChanged: EventDispatcher<OverlayConfig>;
    abstract getConfiguration(): OverlayConfig;
    abstract setConfig(config: OverlayConfig): void;
    abstract getCurrentLayout(playerCount: number): Layout;
}

@Injectable()
export class ConfigService extends IConfigService {
    private _currentConfig: OverlayConfig;
    onConfigChanged: EventDispatcher<OverlayConfig>;

    constructor(overlayService: IOverlayService) {
        super();

        this.onConfigChanged = new EventDispatcher<OverlayConfig>();
        this._currentConfig = this.getConfiguration();

        overlayService.onPlayerChange.subscribe(name => {
            this._currentConfig.mainPlayerName = name;
            this.onConfigChanged.dispatch(this._currentConfig);
        });
    }

    getConfiguration(): OverlayConfig {
        if (!this._currentConfig) {
            this._currentConfig = this.parseConfigFromQs();
        }

        return this._currentConfig;
    }

    private parseConfigFromQs(): OverlayConfig {
        const queryString = this.getQueryString();
        const config = new OverlayConfig();

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
            const fontSize = parseInt(queryString.fontSize);

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
            const autoHide = parseInt(queryString.autohide);

            if (isNaN(autoHide)) {
                console.error(`Specified autohide interval '${queryString.fontSize}' is not a number`);
            } else {
                config.autohide = autoHide;
            }
        }

        return config;
    }

    setConfig(config: OverlayConfig) {
        const queryString: QueryString = {
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

        this._currentConfig = config;

        this.onConfigChanged.dispatch(config);
    }

    getCurrentLayout(playerCount: number) {
        if (playerCount >= AutoSizeThreshold) {
            return this._currentConfig!.allianceLayout;
        } else {
            return this._currentConfig!.partyLayout;
        }
    }
    
    private getQueryString(): QueryString {
        return qs.parse(location.search) as any as QueryString;
    }
}