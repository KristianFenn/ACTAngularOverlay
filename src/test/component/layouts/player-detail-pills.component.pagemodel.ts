import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { BasePageModel, TestSelectors } from '../base.pagemodel';

import { PlayerDetailPillsComponent } from 'src/app/component/layouts/player-detail-pills.component';

const Selectors: TestSelectors = {
    TestId: {
        playerDps: 'player-pills-player-dps',
        playerIcon: 'player-pills-player-icon',
        playerName: 'player-pills-player-name',
        playerMaxHit: 'player-pills-player-maxhit'
    },
    TestClass: {
        player: 'player-pills-player',
    }
}

export class PlayerDetailPillsComponentPageModel extends BasePageModel<PlayerDetailPillsComponent> {
    constructor(fixture: ComponentFixture<PlayerDetailPillsComponent>) {
        super(fixture);
    }

    getPlayers(): PlayerDetailPillsPlayerPageModel[] {
        const playerElements = this.getElementsByTestClass(Selectors.TestClass.player);
        return playerElements.map(ele => new PlayerDetailPillsPlayerPageModel(this._fixture, ele));
    }
}

export class PlayerDetailPillsPlayerPageModel extends BasePageModel<PlayerDetailPillsComponent> {
    constructor(fixture: ComponentFixture<PlayerDetailPillsComponent>, root: DebugElement) {
        super(fixture, root);
    }

    getPlayerDps(): string {
        return this.getElementTextByTestId(Selectors.TestId.playerDps);
    }

    playerDpsHasMainPlayerClass(): boolean {
        return this.elementHasClassByTestId(Selectors.TestId.playerDps, 'main-player');
    }

    getPlayerIconName(): string {
        const element = this.getElementByTestId(Selectors.TestId.playerIcon);
        return element.nativeElement.iconName;
    }

    getPlayerName(): string {
        return this.getElementTextByTestId(Selectors.TestId.playerName);
    }

    playerNameHasMainPlayerClass(): boolean {
        return this.elementHasClassByTestId(Selectors.TestId.playerName, 'main-player');
    }

    getPlayerMaxHit(): string {
        return this.getElementTextByTestId(Selectors.TestId.playerMaxHit);
    }
}