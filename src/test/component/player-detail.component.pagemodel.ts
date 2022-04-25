import { BasePageModel, TestSelectors } from './base.pagemodel';
import { ComponentFixture } from '@angular/core/testing';
import { PlayerDetailComponent } from 'src/app/component/player-detail.component';

const Selectors: TestSelectors = {
    TestClass: {

    },
    TestId: {
        barsComponent: 'player-detail-bars',
        tableComponent: 'player-detail-table',
        pillsComponent: 'player-detail-pills',
        barsContainer: 'player-detail-bars-container',
        tableContainer: 'player-detail-table-container',
        pillsContainer: 'player-detail-pills-container',
    }
};

export class PlayerDetailComponentPageModel extends BasePageModel<PlayerDetailComponent> {
    constructor(fixture: ComponentFixture<PlayerDetailComponent>) {
        super(fixture);
    }

    barsVisible(): boolean {
        return this.elementVisible(Selectors.TestId.barsComponent);
    }

    tableVisible(): boolean {
        return this.elementVisible(Selectors.TestId.tableComponent);
    }

    pillsVisible(): boolean {
        return this.elementVisible(Selectors.TestId.pillsComponent);
    }

    barsContainerHasClass(className: string): boolean {
        const barsContainer = this.getElementByTestId(Selectors.TestId.barsContainer);
        return barsContainer.classes[className];
    }

    tableContainerHasClass(className: string): boolean {
        const barsContainer = this.getElementByTestId(Selectors.TestId.tableContainer);
        return barsContainer.classes[className];
    }

    pillsContainerHasClass(className: string): boolean {
        const barsContainer = this.getElementByTestId(Selectors.TestId.pillsContainer);
        return barsContainer.classes[className];
    }
}