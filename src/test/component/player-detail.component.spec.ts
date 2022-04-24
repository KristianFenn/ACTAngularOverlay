import { TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { IConfigService, ConfigService } from 'src/app/service/config.service';
import { PlayerDetailComponent } from 'src/app/component/player-detail.component';
import { OverlayConfig, Layout, Theme } from 'src/app/models/config.model';
import { EventDispatcher } from 'src/app/service/event.dispatcher';
import { PlayerDetailPillsComponent } from 'src/app/component/layouts/player-detail-pills.component';
import { PlayerDetailComponentPageModel } from './player-detail.component.pagemodel';
import { TestPlayerData } from '../test.data';

describe('Player Detail', () => {
    let mockConfigService: IConfigService;
    let config: OverlayConfig;

    beforeEach(async () => {
        config = {
            partyLayout: Layout.Bars,
            allianceLayout: Layout.Pills,
            theme: Theme.FFXIV,
            autohide: 0,
            fontSize: 16,
            mainPlayerName: 'YOU',
            test: ''
        };

        mockConfigService = {
            onConfigChanged: new EventDispatcher<OverlayConfig>(),
            getConfiguration: () => config,
            getCurrentLayout: () => Layout.Bars,
            setConfig: () => {}
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: IConfigService, useValue: mockConfigService }
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            declarations: [
                PlayerDetailComponent
            ]
        });

        await TestBed.compileComponents();
    });

    describe('intialisation tests', () => {
        it('should assign FFXIV config theme', () => {
            const fixture = TestBed.createComponent(PlayerDetailComponent);
            const targetViewModel = fixture.componentInstance;
    
            expect(targetViewModel.theme)
                .toBe(Theme.FFXIV);
        });
    
        it('should assign FFLogs config theme', () => {
            config.theme = Theme.FFLogs;
    
            const fixture = TestBed.createComponent(PlayerDetailComponent);
            const targetViewModel = fixture.componentInstance;
    
            expect(targetViewModel.theme)
                .toBe(Theme.FFLogs);
        });
    });

    describe('after intialisation', () => {
        let targetViewModel: PlayerDetailComponent;
        let pageModel: PlayerDetailComponentPageModel;

        beforeEach(async () => {
            const fixture = TestBed.createComponent(PlayerDetailComponent);
            targetViewModel = fixture.componentInstance;
            pageModel = new PlayerDetailComponentPageModel(fixture);
            await pageModel.waitForUpdates();
        });

        describe('layout selection tests', () => {
            it('should pass number of players to config service', async () => {
                targetViewModel.players = TestPlayerData;
                spyOn(mockConfigService, "getCurrentLayout");

                await pageModel.waitForUpdates();

                expect(mockConfigService.getCurrentLayout)
                    .toHaveBeenCalledWith(3);
            });

            it('should show bars when layout is bars', async () => {
                spyOn(mockConfigService, "getCurrentLayout")
                    .and.returnValue(Layout.Bars);
                
                await pageModel.waitForUpdates();

                expect(pageModel.barsVisible())
                    .toBeTrue();
                
                expect(pageModel.tableVisible())
                    .toBeFalse();

                expect(pageModel.pillsVisible())
                    .toBeFalse();
            });

            it('should show table when layout is table', async () => {
                spyOn(mockConfigService, "getCurrentLayout")
                    .and.returnValue(Layout.Table);
                
                await pageModel.waitForUpdates();

                expect(pageModel.barsVisible())
                    .toBeFalse();
                
                expect(pageModel.tableVisible())
                    .toBeTrue();

                expect(pageModel.pillsVisible())
                    .toBeFalse();
            });
            
            it('should show pills when layout is pills', async () => {
                spyOn(mockConfigService, "getCurrentLayout")
                    .and.returnValue(Layout.Pills);
                
                await pageModel.waitForUpdates();

                expect(pageModel.barsVisible())
                    .toBeFalse();
                
                expect(pageModel.tableVisible())
                    .toBeFalse();

                expect(pageModel.pillsVisible())
                    .toBeTrue();
            });
        });

        describe('theme tests', () => {
            it('should assign FFXIV theme class to bars', async () => {
                spyOn(mockConfigService, "getCurrentLayout")
                    .and.returnValue(Layout.Bars);
                
                targetViewModel.theme = Theme.FFXIV;
                
                await pageModel.waitForUpdates();

                expect(pageModel.barsContainerHasClass('theme-ffxiv'))
                    .toBeTrue();
            });

            it('should assign FFLogs theme class to bars', async () => {
                spyOn(mockConfigService, "getCurrentLayout")
                    .and.returnValue(Layout.Bars);
                
                targetViewModel.theme = Theme.FFLogs;
                
                await pageModel.waitForUpdates();

                expect(pageModel.barsContainerHasClass('theme-fflogs'))
                    .toBeTrue();
            });

            it('should assign FFXIV theme class to table', async () => {
                spyOn(mockConfigService, "getCurrentLayout")
                    .and.returnValue(Layout.Table);
                
                targetViewModel.theme = Theme.FFXIV;
                
                await pageModel.waitForUpdates();

                expect(pageModel.tableContainerHasClass('theme-ffxiv'))
                    .toBeTrue();
            });

            it('should assign FFLogs theme class to bars', async () => {
                spyOn(mockConfigService, "getCurrentLayout")
                    .and.returnValue(Layout.Table);
                
                targetViewModel.theme = Theme.FFLogs;
                
                await pageModel.waitForUpdates();

                expect(pageModel.tableContainerHasClass('theme-fflogs'))
                    .toBeTrue();
            });

            it('should assign FFXIV theme class to pills', async () => {
                spyOn(mockConfigService, "getCurrentLayout")
                    .and.returnValue(Layout.Pills);
                
                targetViewModel.theme = Theme.FFXIV;
                
                await pageModel.waitForUpdates();

                expect(pageModel.pillsContainerHasClass('theme-ffxiv'))
                    .toBeTrue();
            });

            it('should assign FFLogs theme class to pills', async () => {
                spyOn(mockConfigService, "getCurrentLayout")
                    .and.returnValue(Layout.Pills);
                
                targetViewModel.theme = Theme.FFLogs;
                
                await pageModel.waitForUpdates();

                expect(pageModel.pillsContainerHasClass('theme-fflogs'))
                    .toBeTrue();
            });
        });

        describe('on config changed', () => {
            it('should assign theme', async () => {
                targetViewModel.theme = Theme.FFXIV;

                config.theme = Theme.FFLogs;

                mockConfigService.onConfigChanged.dispatch(config);
                await pageModel.waitForUpdates();

                expect(targetViewModel.theme)
                    .toBe(Theme.FFLogs);
            });
        });
    });
});