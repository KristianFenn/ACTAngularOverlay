import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { OverlayComponent } from 'src/app/component/overlay.component';
import { IUpdater, OverlayUpdateEvent } from 'src/app/service/updater.service';
import { IAutoHideService } from 'src/app/service/autohide.service';
import { IConfigService } from 'src/app/service/config.service';
import { OverlayComponentPageModel } from './overlay.component.pagemodel';
import { EventDispatcher } from 'src/app/service/event.dispatcher';
import { OverlayConfig, Theme, Layout } from 'src/app/models/config.model';
import { ActUpdate } from 'src/app/models/update.model';
import { IEncounter } from 'src/app/models/encounter.model';

describe('Overlay', () => {
    let mockUpdater: IUpdater;
    let mockAutohideService: IAutoHideService;
    let mockConfigService: IConfigService;
    let mockHttp: HttpTestingController;
    let config: OverlayConfig;
    let mockUpdate: ActUpdate;

    beforeEach(async () => {
        mockUpdater = {
            onEncounterUpdated: new EventDispatcher<OverlayUpdateEvent>(),
            updateEncounter: () => { }
        };

        mockAutohideService = {
            onShouldShowChanged: new EventDispatcher<boolean>(),
            pauseAutohide: () => { },
            resumeAutohide: () => { },
            resetAutohideTimer: () => { }
        };

        config = {
            theme: Theme.FFXIV,
            partyLayout: Layout.Bars,
            allianceLayout: Layout.Table,
            fontSize: 16,
            autohide: 0,
            mainPlayerName: 'YOU',
            test: ''
        };

        mockConfigService = {
            getConfiguration: () => config,
            getCurrentLayout: () => Layout.Bars,
            onConfigChanged: new EventDispatcher<OverlayConfig>(),
            setConfig: () => { }
        };

        mockUpdate = {
            Combatant: {},
            Encounter: {
                CurrentZoneName: 'Test Zone',
                ENCDPS: 20000,
                damage: '200000',
                duration: '00:10',
                maxhit: 'Woah - 35k'
            },
            isActive: 'true'
        };

        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            providers: [
                HttpClientTestingModule,
                { provide: IConfigService, useValue: mockConfigService },
                { provide: IUpdater, useValue: mockUpdater },
                { provide: IAutoHideService, useValue: mockAutohideService }
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA
            ],
            declarations: [
                OverlayComponent
            ]
        });

        await TestBed.compileComponents();
        mockHttp = TestBed.inject(HttpTestingController);
    });

    describe('during startup', () => {
        describe('no test mode', () => {
            let fixture: ComponentFixture<OverlayComponent>; 
            let targetViewModel: OverlayComponent;
            let pageModel: OverlayComponentPageModel;

            beforeEach(async () => {
                fixture = TestBed.createComponent(OverlayComponent);
                targetViewModel = fixture.componentInstance;
                await fixture.whenStable();
                fixture.detectChanges();
                pageModel = new OverlayComponentPageModel(fixture);
            });

            it('should initialise state', () => {
                expect(targetViewModel.encounter)
                    .toBeDefined();
    
                expect(targetViewModel.showOptions)
                    .toBeFalse();
    
                expect(targetViewModel.showOverlay)
                    .toBeTrue();
    
                expect(targetViewModel.fontSize)
                    .toBe(16);
    
                expect(targetViewModel.testMode)
                    .toBe(false);
            });

            it('should hide test options if no test is specified', () => {
                expect(pageModel.testButtonsVisible())
                    .toBeFalse();
            });
        });

        describe('test mode', () => {
            let fixture: ComponentFixture<OverlayComponent>; 
            let targetViewModel: OverlayComponent;
            let pageModel: OverlayComponentPageModel;

            beforeEach(async () => {
                config.test = 'alliance';
                fixture = TestBed.createComponent(OverlayComponent);
                targetViewModel = fixture.componentInstance;
                await fixture.whenStable();
                fixture.detectChanges();
                pageModel = new OverlayComponentPageModel(fixture);
            });

            it('should load test file if test is specified', () => {
                spyOn(mockUpdater, 'updateEncounter');

                expect(targetViewModel.testMode)
                    .toBeTrue();
    
                const mockPromise = mockHttp.expectOne('/assets/test/alliance.json');
                mockPromise.flush(mockUpdate);
    
                expect(mockUpdater.updateEncounter)
                    .toHaveBeenCalledOnceWith(mockUpdate, targetViewModel.encounter);
            });
    
            it('should display test options if test is specified', () => {
                expect(pageModel.testButtonsVisible())
                    .toBeTrue();
            });
    
            it('should load alliance file when test alliance clicked', () => {
                expect(targetViewModel.testMode)
                    .toBeTrue();
    
                let mockPromise = mockHttp.expectOne('/assets/test/alliance.json');
                mockPromise.flush(mockUpdate);
    
                spyOn(mockUpdater, 'updateEncounter');

                pageModel.clickTestAlliance();
    
                mockPromise = mockHttp.expectOne('/assets/test/alliance.json');
                mockPromise.flush(mockUpdate);
    
                expect(mockUpdater.updateEncounter)
                    .toHaveBeenCalledOnceWith(mockUpdate, targetViewModel.encounter);
            });
    
            it('should load alliance file when test alliance clicked', () => {
                expect(targetViewModel.testMode)
                    .toBeTrue();
    
                let mockPromise = mockHttp.expectOne('/assets/test/alliance.json');
                mockPromise.flush(mockUpdate);
    
                spyOn(mockUpdater, 'updateEncounter');

                pageModel.clickTestParty();
    
                mockPromise = mockHttp.expectOne('/assets/test/party.json');
                mockPromise.flush(mockUpdate);
    
                expect(mockUpdater.updateEncounter)
                    .toHaveBeenCalledOnceWith(mockUpdate, targetViewModel.encounter);
            });
        });
    });

    describe('after startup', () => {
        let pageModel: OverlayComponentPageModel;
        let targetViewModel: OverlayComponent;

        beforeEach(async () => {
            const fixture = TestBed.createComponent(OverlayComponent);
            targetViewModel = fixture.componentInstance;

            fixture.detectChanges();
            await fixture.whenStable();

            pageModel = new OverlayComponentPageModel(fixture);
        });

        it('should toggle options when options is clicked', () => {
            expect(targetViewModel.showOptions)
                .toBeFalse();
 
            expect(pageModel.overlayConfigVisible())
                .toBeFalse();
            
            expect(pageModel.playerTableVisible())
                .toBeTrue();

            // show options
            pageModel.clickToggleOptions();

            expect(targetViewModel.showOptions)
                .toBeTrue();

            expect(pageModel.overlayConfigVisible())
                .toBeTrue();
            
            expect(pageModel.playerTableVisible())
                .toBeFalse();
 
            // hide options
            pageModel.clickToggleOptions();

            expect(targetViewModel.showOptions)
                .toBeFalse();

            expect(pageModel.overlayConfigVisible())
                .toBeFalse();
            
            expect(pageModel.playerTableVisible())
                .toBeTrue();
        });

        it('should toggle autohide when config is shown and hidden', () => {
            spyOn(mockAutohideService, 'pauseAutohide');
            spyOn(mockAutohideService, 'resumeAutohide');

            expect(targetViewModel.showOptions)
                .toBeFalse();
            
            // show config
            pageModel.clickToggleOptions();

            expect(targetViewModel.showOptions)
                .toBeTrue();
        
            expect(mockAutohideService.pauseAutohide)
                .toHaveBeenCalledTimes(1);

            // hide config
            pageModel.clickToggleOptions();

            expect(targetViewModel.showOptions)
                .toBeFalse();
        
            expect(mockAutohideService.resumeAutohide)
                .toHaveBeenCalledTimes(1);
        });

        it('should toggle hidden state when toggle hide is clicked', () => {
            expect(targetViewModel.showOverlay)
                .toBeTrue();
            
            expect(pageModel.overlayContainerVisible())
                .toBeTrue();
            
            expect(pageModel.overlayHiddenVisible())
                .toBeFalse();
            
            // hide overlay
            pageModel.clickHideOverlay();

            expect(targetViewModel.showOverlay)
                .toBeFalse();
            
            expect(pageModel.overlayContainerVisible())
                .toBeFalse();
            
            expect(pageModel.overlayHiddenVisible())
                .toBeTrue();

            // show overlay
            pageModel.clickShowOverlay();

            expect(targetViewModel.showOverlay)
                .toBeTrue();
            
            expect(pageModel.overlayContainerVisible())
                .toBeTrue();
            
            expect(pageModel.overlayHiddenVisible())
                .toBeFalse();
        });

        it('should toggle autohide when overlay is hidden and shown', () => {
            spyOn(mockAutohideService, 'pauseAutohide');
            spyOn(mockAutohideService, 'resumeAutohide');

            expect(targetViewModel.showOverlay)
                .toBeTrue();
            
            // hide overlay
            pageModel.clickHideOverlay();

            expect(targetViewModel.showOverlay)
                .toBeFalse();
        
            expect(mockAutohideService.pauseAutohide)
                .toHaveBeenCalledTimes(1);

            // show overlay
            pageModel.clickShowOverlay();

            expect(targetViewModel.showOverlay)
                .toBeTrue();
        
            expect(mockAutohideService.resumeAutohide)
                .toHaveBeenCalledTimes(1);
        });

        describe('encounter update', () => {
            const testEncounter: IEncounter = {
                area: 'Test Zone',
                dps: 20000,
                duration: '01:40',
                maxhit: 'Woah - 35k',
                players: [{ 
                        name: 'Dude McFace', 
                        maxhit: 'Woah - 35k', 
                        dps: 20000, 
                        damage: 2000000, 
                        class: 'PLD',
                        critDirectHitPercent: '15',
                        critPercent: '30',
                        directHitPercent: '30',
                        deaths: 0,
                        dpsPercent: 100,
                        damageFormatted: '2,000,000',
                        hps: 0,
                        maxhitamount: '35k',
                        misses: 0,
                        overhealPercent: '0',
                        rank: 1
                    }
                ]
            };

            it('should call updater when ACT update event triggers', () => {
                spyOn(mockUpdater, 'updateEncounter');

                pageModel.fireEncounterUpdateEvent(mockUpdate);

                expect(mockUpdater.updateEncounter)
                    .toHaveBeenCalledOnceWith(mockUpdate, targetViewModel.encounter);
            });

            it('should show no header and no data message when no data', () => {
                expect(pageModel.headerVisible())
                    .toBeFalse();

                expect(pageModel.noDataMessageVisible())
                    .toBeTrue();
                
                expect(pageModel.playerDetailVisible())
                    .toBeFalse();
            });

            it('should show header and player detail after encounter updates', async () => {
                mockUpdater.onEncounterUpdated.dispatch({ encounter: testEncounter, active: true });
                await pageModel.waitForUpdates();

                expect(pageModel.headerVisible())
                    .toBeTrue();

                expect(pageModel.noDataMessageVisible())
                    .toBeFalse();
                
                expect(pageModel.playerDetailVisible())
                    .toBeTrue();
            });

            it('should reset autohide on active encounter update', async () => {
                spyOn(mockAutohideService, 'resetAutohideTimer');

                mockUpdater.onEncounterUpdated.dispatch({ encounter: testEncounter, active: true });
                await pageModel.waitForUpdates();

                expect(mockAutohideService.resetAutohideTimer)
                    .toHaveBeenCalledTimes(1);
            });

            it('should not reset autohide on inactive encounter update', async () => {
                spyOn(mockAutohideService, 'resetAutohideTimer');

                mockUpdater.onEncounterUpdated.dispatch({ encounter: testEncounter, active: false });
                await pageModel.waitForUpdates();

                expect(mockAutohideService.resetAutohideTimer)
                    .not.toHaveBeenCalled();
            });

            it('should populate expected header values', async () => {
                mockUpdater.onEncounterUpdated.dispatch({ encounter: testEncounter, active: true });
                await pageModel.waitForUpdates();

                expect(pageModel.getAreaHeaderText())
                    .toBe('Area:Test Zone');
                
                expect(pageModel.getDpsHeaderText())
                    .toBe('Total DPS:20,000');
                
                expect(pageModel.getDurationHeaderText())
                    .toBe('Duration:01:40');
            });
        });
    });
});