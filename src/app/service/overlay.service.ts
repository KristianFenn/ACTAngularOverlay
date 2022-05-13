import { Injectable } from '@angular/core';
import { EventDispatcher } from './event.dispatcher';
import { ActUpdate } from '../models/update.model';
import OverlayAPI from 'ffxiv-overlay-api/lib';

export abstract class IOverlayService {
    abstract onCombatUpdate: EventDispatcher<ActUpdate>;
    abstract onPlayerChange: EventDispatcher<string>;
}

@Injectable()
export class OverlayService extends IOverlayService {
    private overlayApi: OverlayAPI;
    onCombatUpdate: EventDispatcher<ActUpdate>;
    onPlayerChange: EventDispatcher<string>;

    constructor() {
        super();
        this.onCombatUpdate = new EventDispatcher<ActUpdate>();
        this.onPlayerChange = new EventDispatcher<string>();

        this.overlayApi = new OverlayAPI();

        this.overlayApi.addListener('CombatData', data => {
          this.onCombatUpdate.dispatch(data as any);
        });

        this.overlayApi.addListener('ChangePrimaryPlayer', data => {
            this.onPlayerChange.dispatch(data.charName);
        });
    
        this.overlayApi.startEvent();
    }
}