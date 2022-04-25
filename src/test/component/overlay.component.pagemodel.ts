import { BasePageModel, TestSelectors } from './base.pagemodel';
import { OverlayComponent } from 'src/app/component/overlay.component';
import { ComponentFixture } from '@angular/core/testing';
import { ActUpdateEvent, ActUpdate } from 'src/app/models/update.model';

const Selectors: TestSelectors = {
    TestId: {
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
    },
    TestClass: {
    }
};

export class OverlayComponentPageModel extends BasePageModel<OverlayComponent> {
    constructor(fixture: ComponentFixture<OverlayComponent>) {
        super(fixture);
    }

    testButtonsVisible(): boolean {
        return this.elementVisible(Selectors.TestId.loadAlliance)
            || this.elementVisible(Selectors.TestId.loadParty);
    }

    clickTestAlliance(): void {
        this.clickElementByTestId(Selectors.TestId.loadAlliance);
    }

    clickTestParty() {
        this.clickElementByTestId(Selectors.TestId.loadParty);
    }

    clickToggleOptions() {
        this.clickElementByTestId(Selectors.TestId.toggleOptions);
    }

    overlayConfigVisible() {
        return this.elementVisible(Selectors.TestId.overlayConfigComponent);
    }

    playerTableVisible() {
        return this.elementVisible(Selectors.TestId.playerTable);
    }

    overlayContainerVisible() {
        return this.elementVisible(Selectors.TestId.overlayContainer);
    }

    overlayHiddenVisible() {
        return this.elementVisible(Selectors.TestId.overlayHidden);
    }

    clickHideOverlay() {
        this.clickElementByTestId(Selectors.TestId.hideOverlay);
    }

    clickShowOverlay() {
        this.clickElementByTestId(Selectors.TestId.showOverlay);
    }

    noDataMessageVisible() {
        return this.elementVisible(Selectors.TestId.noDataMessage);
    }

    playerDetailVisible() {
        return this.elementVisible(Selectors.TestId.playerDetailComponent);
    }

    headerVisible() {
        return this.elementVisible(Selectors.TestId.header);
    }

    fireEncounterUpdateEvent(update: ActUpdate) {
        const event = new Event('onOverlayDataUpdate') as ActUpdateEvent;
        event.detail = update;
        document.dispatchEvent(event);
    }

    getDurationHeaderText(): string {
        return this.getElementTextByTestId(Selectors.TestId.headerDuration);
    }

    getAreaHeaderText(): string {
        return this.getElementTextByTestId(Selectors.TestId.headerArea);
    }
    
    getDpsHeaderText(): string {
        return this.getElementTextByTestId(Selectors.TestId.headerDps);
    }
}