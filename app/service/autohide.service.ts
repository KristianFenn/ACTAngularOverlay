import { Injectable } from "@angular/core";

import EventDispatcher from "./event.dispatcher";
import ConfigService from "./config.service";
import OverlayConfig from "../models/config.model";

@Injectable()
export default class AutoHideService {
    onShouldHide: EventDispatcher<void>;
    onShouldShow: EventDispatcher<void>;
    autohideDelay: number;
    timeoutHandle: number;

    constructor(configService: ConfigService) {
        this.onShouldShow = new EventDispatcher<void>();
        this.onShouldHide = new EventDispatcher<void>();

        let config = configService.getConfiguration();
        this.configureAutohide(config);
        
        configService.onConfigChanged.subscribe(config => {
            this.configureAutohide(config);
        });
    }

    configureAutohide(config: OverlayConfig) {
        // check we actually have something to reconfigure first.
        if (config.autohide != this.autohideDelay) {
            this.autohideDelay = config.autohide;

            this.setupAutohide();
        }
    }

    resetAutohide() {
        this.setupAutohide();

        this.onShouldShow.dispatch(null);
    }

    private setupAutohide() {
        if (this.timeoutHandle) {
            window.clearTimeout(this.timeoutHandle);
        }

        if (this.autohideDelay) {
            this.timeoutHandle = window.setTimeout(() => 
                this.onShouldHide.dispatch(null), 
                this.autohideDelay * 1000);
        }
    }
}