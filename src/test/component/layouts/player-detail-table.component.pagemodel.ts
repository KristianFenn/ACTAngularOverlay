import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { BasePageModel, TestSelectors } from '../base.pagemodel';

import { PlayerDetailTableComponent } from 'src/app/component/layouts/player-detail-table.component';

const Selectors: TestSelectors = {
    TestId: {
        playerBackground: 'player-table-player-background',
        playerFieldIcon: 'player-table-player-field-icon',
        playerFieldText: 'player-table-player-field-text'
    },
    TestClass: {
        headerTitle: 'player-table-header-title',
        player: 'player-table-player',
        playerField: 'player-table-player-field'
    }
}

export class PlayerDetailTableComponentPageModel extends BasePageModel<PlayerDetailTableComponent> {
    constructor(fixture: ComponentFixture<PlayerDetailTableComponent>) {
        super(fixture);
    }

    getPlayerTableHeaderTitles(): string[] {
        const titleElements = this.getElementsByTestClass(Selectors.TestClass.headerTitle);
        return titleElements.map(te => (te.nativeElement as HTMLElement).textContent!);
    }

    getPlayers(): PlayerDetailTablePlayerPageModel[] {
        const playerElements = this.getElementsByTestClass(Selectors.TestClass.player);
        return playerElements.map(ele => new PlayerDetailTablePlayerPageModel(this._fixture, ele));
    }
}

export class PlayerDetailTablePlayerPageModel extends BasePageModel<PlayerDetailTableComponent> {
    constructor(fixture: ComponentFixture<PlayerDetailTableComponent>, root: DebugElement) {
        super(fixture, root);
    }

    getPlayerFields(): PlayerDetailTablePlayerFieldPageModel[] {
        return this.getElementsByTestClass(Selectors.TestClass.playerField)
            .map(ele => new PlayerDetailTablePlayerFieldPageModel(this._fixture, ele));
    }

    getPlayerBackgroundWidth(): string {
        const backgroundElement = this.getElementByTestId(Selectors.TestId.playerBackground);
        const width = backgroundElement.styles['width'];

        if (!width) {
            throw `Background for ${this.getPlayerFields()[2].getFieldText()} does not have width`;
        }

        return width;
    }
}

export class PlayerDetailTablePlayerFieldPageModel extends BasePageModel<PlayerDetailTableComponent> {
    constructor(fixture: ComponentFixture<PlayerDetailTableComponent>, root: DebugElement) {
        super(fixture, root);
    }

    getFieldText(): string {
        return this.getElementTextByTestId(Selectors.TestId.playerFieldText);
    }

    getFieldIconName(): string {
        const field = this.getElementByTestId(Selectors.TestId.playerFieldIcon);
        return field.nativeElement.iconName;
    }

    fieldHasTextRedClass(): boolean {
        return this.elementHasClassByTestId(Selectors.TestId.playerFieldText, 'text-red');
    }

    fieldHasMainPlayerClass(): boolean {
        return this.elementHasClassByTestId(Selectors.TestId.playerFieldText, 'main-player');
    }
}
