import { BasePageModel } from './base.pagemodel';
import { OverlayComponent } from 'src/app/component/overlay.component';
import { ComponentFixture } from '@angular/core/testing';
import { ActUpdateEvent, ActUpdate } from 'src/app/models/update.model';

const TestIds = {
    overlayContainer: 'overlay-container',
    loadAlliance: 'overlay-load-alliance',
    loadParty: 'overlay-load-party',
    toggleOptions: 'overlay-toggle-options',
    hideOverlay: 'overlay-hide-overlay',
    headerDuration: 'overlay-header-duration',
    header: 'overlay-header',
    headerDps: 'overlay-header-dps',
    headerArea: 'overlay-header-area',
    playerTable: 'overlay-player-table',
    noDataMessage: 'overlay-no-data',
    playerDetailComponent: 'overlay-player-detail',
    overlayConfigComponent: 'overlay-overlay-config',
    overlayHidden: 'overlay-hidden',
    showOverlay: 'overlay-show-overlay'
};

export class OverlayComponentPageModel extends BasePageModel<OverlayComponent> {
    constructor(fixture: ComponentFixture<OverlayComponent>) {
        super(fixture);
    }

    testButtonsVisible(): boolean {
        return this.elementVisible(TestIds.loadAlliance)
            || this.elementVisible(TestIds.loadParty);
    }

    clickTestAlliance(): void {
        this.clickElementByTestId(TestIds.loadAlliance);
    }

    clickTestParty() {
        this.clickElementByTestId(TestIds.loadParty);
    }

    clickToggleOptions() {
        this.clickElementByTestId(TestIds.toggleOptions);
    }

    overlayConfigVisible() {
        return this.elementVisible(TestIds.overlayConfigComponent);
    }

    playerTableVisible() {
        return this.elementVisible(TestIds.playerTable);
    }

    overlayContainerVisible() {
        return this.elementVisible(TestIds.overlayContainer);
    }

    overlayHiddenVisible() {
        return this.elementVisible(TestIds.overlayHidden);
    }

    clickHideOverlay() {
        this.clickElementByTestId(TestIds.hideOverlay);
    }

    clickShowOverlay() {
        this.clickElementByTestId(TestIds.showOverlay);
    }

    noDataMessageVisible() {
        return this.elementVisible(TestIds.noDataMessage);
    }

    playerDetailVisible() {
        return this.elementVisible(TestIds.playerDetailComponent);
    }

    headerVisible() {
        return this.elementVisible(TestIds.header);
    }

    fireEncounterUpdateEvent(update: ActUpdate) {
        const event = new Event('onOverlayDataUpdate') as ActUpdateEvent;
        event.detail = update;
        document.dispatchEvent(event);
    }

    getDurationHeaderText(): string {
        return this.getElementTextByTestId(TestIds.headerDuration);
    }

    getAreaHeaderText(): string {
        return this.getElementTextByTestId(TestIds.headerArea);
    }
    
    getDpsHeaderText(): string {
        return this.getElementTextByTestId(TestIds.headerDps);
    }
}