import { Injectable } from "@angular/core";

import { EventDispatcher } from "./event.dispatcher";
import { IConfigService } from "./config.service";
import { OverlayConfig } from "../models/config.model";

export abstract class IAutoHideService {
    abstract onShouldShowChanged: EventDispatcher<boolean>;
    abstract pauseAutohide(): void;
    abstract resumeAutohide(): void;
    abstract resetAutohideTimer(): void;
}

@Injectable()
export class AutoHideService extends IAutoHideService {
    private autohideDelay: number;
    onShouldShowChanged: EventDispatcher<boolean>;
    timeoutHandle: NodeJS.Timeout | null;

    constructor(configService: IConfigService) {
        super();
        
        this.onShouldShowChanged = new EventDispatcher<boolean>();
        this.autohideDelay = 0;
        this.timeoutHandle = null;

        let config = configService.getConfiguration();
        this.configureAutohide(config);
        
        configService.onConfigChanged.subscribe(config => {
            this.configureAutohide(config);
        });
    }

    pauseAutohide() {
        this.clearTimeout();
    }

    resumeAutohide() {
        this.setupAutohide();
    
        this.onShouldShowChanged.dispatch(true);
    }

    resetAutohideTimer() {
        if (this.timeoutHandle) {
            this.setupAutohide();
    
            this.onShouldShowChanged.dispatch(true);
        }
    }

    private configureAutohide(config: OverlayConfig) {
        this.autohideDelay = config.autohide;

        this.setupAutohide();
    }

    private setupAutohide() {
        this.clearTimeout();

        if (this.autohideDelay) {
            this.timeoutHandle = setTimeout(() => 
                this.onShouldShowChanged.dispatch(false), 
                this.autohideDelay * 1000);
        }
    }

    private clearTimeout() {
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
            this.timeoutHandle = null;
        }
    }
}