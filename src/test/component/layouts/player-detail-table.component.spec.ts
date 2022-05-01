import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PlayerDetailTableComponentPageModel, PlayerDetailTablePlayerPageModel } from './player-detail-table.component.pagemodel';
import { TestPlayerData } from 'src/test/test.data';

import { PlayerDetailTableComponent } from 'src/app/component/layouts/player-detail-table.component';
import { IConfigService } from 'src/app/service/config.service';
import { OverlayConfig, Layout, Theme } from 'src/app/models/config.model';
import { EventDispatcher } from 'src/app/service/event.dispatcher';
import { AbbreviateNumberPipe } from 'src/app/pipes/abbreviate-number.pipe';

describe('Player Table', () => {
    let targetViewModel: PlayerDetailTableComponent;
    let pageModel: PlayerDetailTableComponentPageModel;
    let mockConfigService: IConfigService;
    let config: OverlayConfig;

    beforeEach(async () => {
        config = {
            partyLayout: Layout.Bars,
            allianceLayout: Layout.Pills,
            theme: Theme.FFXIV,
            autohide: 0,
            fontSize: 16,
            mainPlayerName: 'Paladin Paladin',
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
                { provide: IConfigService, useValue: mockConfigService },
                AbbreviateNumberPipe
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ],
            declarations: [
                PlayerDetailTableComponent,
                AbbreviateNumberPipe
            ]
        });

        await TestBed.compileComponents();

        const fixture = TestBed.createComponent(PlayerDetailTableComponent);
        targetViewModel = fixture.componentInstance;
        targetViewModel.players = TestPlayerData;
        pageModel = new PlayerDetailTableComponentPageModel(fixture);
        await pageModel.waitForUpdates();
    });

    describe('table header', () => {
        it('should render 5 headers', () => {
            const titles = pageModel.getPlayerTableHeaderTitles();
    
            expect(titles.length)
                .toBe(5);
        });
    
        it('should have correct headers', () => {
            const titles = pageModel.getPlayerTableHeaderTitles();
    
            expect(titles[0])
                .toBe('DPS');

            expect(titles[1])
                .toBe('Class');
            
            expect(titles[2])
                .toBe('Player');
            
            expect(titles[3])
                .toBe('Max Hit');
            
            expect(titles[4])
                .toBe('Deaths');
        });
    });

    describe('player table', () => {
        it('should render 3 players', () => {
            const players = pageModel.getPlayers();

            expect(players.length)
                .toBe(3);
        });

        describe('first combatant', () => {
            let playerPageModel: PlayerDetailTablePlayerPageModel;

            beforeEach(() => {
                const players = pageModel.getPlayers();
                playerPageModel = players[0];
            });

            it('should be Monk Monk', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[2].getFieldText())
                    .toBe('Monk Monk');
            });

            it('should have correct DPS', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[0].getFieldText())
                    .toBe('2500');
            });

            it('should have correct Icon', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[1].getFieldIconName())
                    .toBe('MNK');
            });

            it('should have correct maxhit', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[3].getFieldText())
                    .toBe('25k - Woah');
            });

            it('should have correct deaths', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[4].getFieldText())
                    .toBe('1');
            });

            it('should have red deaths text', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[4].fieldHasTextRedClass())
                    .toBeTrue();
            });

            it('should have correct background width', () => {
                expect(playerPageModel.getPlayerBackgroundWidth())
                    .toBe('100%');
            });

            it('should not have main player classes', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[0].fieldHasMainPlayerClass())
                    .toBeFalse();

                expect(fields[2].fieldHasMainPlayerClass())
                    .toBeFalse();
            });
        });

        describe('second combatant', () => {
            let playerPageModel: PlayerDetailTablePlayerPageModel;

            beforeEach(() => {
                const players = pageModel.getPlayers();
                playerPageModel = players[1];
            });

            it('should be Paladin Paladin', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[2].getFieldText())
                    .toBe('Paladin Paladin');
            });

            it('should have correct DPS', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[0].getFieldText())
                    .toBe('2000');
            });

            it('should have correct Icon', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[1].getFieldIconName())
                    .toBe('PLD');
            });

            it('should have correct maxhit', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[3].getFieldText())
                    .toBe('15k - Sword');
            });

            it('should have correct deaths', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[4].getFieldText())
                    .toBe('0');
            });

            it('should have red deaths text', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[4].fieldHasTextRedClass())
                    .toBeFalse();
            });

            it('should have correct background width', () => {
                expect(playerPageModel.getPlayerBackgroundWidth())
                    .toBe('80%');
            });

            it('should have main player classes', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[0].fieldHasMainPlayerClass())
                    .toBeTrue();

                expect(fields[2].fieldHasMainPlayerClass())
                    .toBeTrue();
            });
        });

        describe('third combatant', () => {
            let playerPageModel: PlayerDetailTablePlayerPageModel;

            beforeEach(() => {
                const players = pageModel.getPlayers();
                playerPageModel = players[2];
            });

            it('should be Scholar Scholar', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[2].getFieldText())
                    .toBe('Scholar Scholar');
            });

            it('should have correct DPS', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[0].getFieldText())
                    .toBe('1500');
            });

            it('should have correct Icon', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[1].getFieldIconName())
                    .toBe('SCH');
            });

            it('should have correct maxhit', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[3].getFieldText())
                    .toBe('10k - Book');
            });

            it('should have correct deaths', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[4].getFieldText())
                    .toBe('2');
            });

            it('should have red deaths text', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[4].fieldHasTextRedClass())
                    .toBeTrue();
            });

            it('should have correct background width', () => {
                expect(playerPageModel.getPlayerBackgroundWidth())
                    .toBe('60%');
            });

            it('should not have main player classes', () => {
                const fields = playerPageModel.getPlayerFields();
                expect(fields[0].fieldHasMainPlayerClass())
                    .toBeFalse();

                expect(fields[2].fieldHasMainPlayerClass())
                    .toBeFalse();
            });
        });
    });
});