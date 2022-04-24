import { BasePageModel } from './base.pagemodel';
import { ComponentFixture } from '@angular/core/testing';
import { PlayerDetailComponent } from 'src/app/component/player-detail.component';

const Selectors = {
    TestIds: {
        barsComponent: 'player-detail-bars',
        tableComponent: 'player-detail-table',
        pillsComponent: 'player-detail-pills',
        barsContainer: 'player-detail-bars-container',
        tableContainer: 'player-detail-table-container',
        pillsContainer: 'player-detail-pills-container',
    }
}

export class PlayerDetailComponentPageModel extends BasePageModel<PlayerDetailComponent> {
    constructor(fixture: ComponentFixture<PlayerDetailComponent>) {
        super(fixture);
    }

    barsVisible(): boolean {
        return this.elementVisible(Selectors.TestIds.barsComponent);
    }

    tableVisible(): boolean {
        return this.elementVisible(Selectors.TestIds.tableComponent);
    }

    pillsVisible(): boolean {
        return this.elementVisible(Selectors.TestIds.pillsComponent);
    }

    barsContainerHasClass(className: string): boolean {
        const barsContainer = this.getElementByTestId(Selectors.TestIds.barsContainer);
        return barsContainer.classes[className];
    }

    tableContainerHasClass(className: string): boolean {
        const barsContainer = this.getElementByTestId(Selectors.TestIds.tableContainer);
        return barsContainer.classes[className];
    }

    pillsContainerHasClass(className: string): boolean {
        const barsContainer = this.getElementByTestId(Selectors.TestIds.pillsContainer);
        return barsContainer.classes[className];
    }
}