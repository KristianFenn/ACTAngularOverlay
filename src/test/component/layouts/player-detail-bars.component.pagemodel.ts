import { BasePageModel } from '../base.pagemodel'
import { ComponentFixture } from '@angular/core/testing';
import { PlayerDetailBarsComponent } from 'src/app/component/layouts/player-detail-bars.component';
import { DebugElement } from '@angular/core';

const Selectors = {
    TestClass: {
        playerBar: 'player-bar'
    },
    TestId: {
        playerBackground: 'player-bar-background',
        playerDps: 'player-bar-dps',
        playerIcon: 'player-bar-icon',
        playerName: 'player-bar-name',
        playerMaxHit: 'player-bar-maxhit',
        playerTotalDamange: 'player-bar-totaldamage',
        playerHealing: 'player-bar-healing',
        playerDeaths: 'player-bar-deaths',
        playerCrits: 'player-bar-crits'
    }
}

export class PlayerDetailBarsComponentPageModel extends BasePageModel<PlayerDetailBarsComponent> {
    constructor(fixture: ComponentFixture<PlayerDetailBarsComponent>) {
        super(fixture);
    }

    getPlayerBarCount(): number {
        return this.getElementsByTestClass(Selectors.TestClass.playerBar).length;
    }

    getBarAtIndex(index: number): PlayerDetailBarsBarPageModel {
        if (index >= this.getPlayerBarCount()) {
            throw `Index out of range`;
        }

        const bars = this.getElementsByTestClass(Selectors.TestClass.playerBar)
            .map(de => new PlayerDetailBarsBarPageModel(this._fixture, de));

        return bars[index];
    }
}

export class PlayerDetailBarsBarPageModel extends BasePageModel<PlayerDetailBarsComponent> {
    constructor(fixture: ComponentFixture<PlayerDetailBarsComponent>, barsElement: DebugElement) {
        super(fixture, barsElement);
    }

    getPlayerBackgroundWidth(): string {
        const backgroundElement = this.getElementByTestId(Selectors.TestId.playerBackground);
        const width = backgroundElement.styles['width'];

        if (!width) {
            throw `Background for ${this.getPlayerName()} does not have width`;
        }

        return width;
    }

    getDpsValue(): string {
        return this.getElementTextByTestId(Selectors.TestId.playerDps);
    }

    dpsHasMainPlayerClass(): boolean {
        return this.elementHasClassByTestId(Selectors.TestId.playerDps, 'main-player');
    }

    getIconName(): string {
        const iconName = this.getElementByTestId(Selectors.TestId.playerIcon)
            .nativeNode.iconName;

        if (!iconName) {
            throw `Icon for ${this.getPlayerName()} does not have name`;
        }

        return iconName;
    }

    getPlayerName(): string {
        return this.getElementTextByTestId(Selectors.TestId.playerName);
    }

    nameHasMainPlayerClass(): boolean {
        return this.elementHasClassByTestId(Selectors.TestId.playerName, 'main-player');
    }

    getMaxHit(): string {
        return this.getElementTextByTestId(Selectors.TestId.playerMaxHit);
    }

    getTotalDamage(): string {
        return this.getElementTextByTestId(Selectors.TestId.playerTotalDamange);
    }

    getHealing(): string {
        return this.getElementTextByTestId(Selectors.TestId.playerHealing);
    }

    getDeaths(): string {
        return this.getElementTextByTestId(Selectors.TestId.playerDeaths);
    }

    deathsHasTextRedClass(): boolean {
        return this.elementHasClassByTestId(Selectors.TestId.playerDeaths, 'text-red');
    }

    getCrits(): string {
        return this.getElementTextByTestId(Selectors.TestId.playerCrits);
    }
}