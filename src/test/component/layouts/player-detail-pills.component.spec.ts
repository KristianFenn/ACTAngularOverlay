import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TestPlayerData } from 'src/test/test.data';

import { IConfigService } from 'src/app/service/config.service';
import { OverlayConfig, Layout, Theme } from 'src/app/models/config.model';
import { EventDispatcher } from 'src/app/service/event.dispatcher';
import { AbbreviateNumberPipe } from 'src/app/pipes/abbreviate-number.pipe';
import { PlayerDetailPillsComponent } from 'src/app/component/layouts/player-detail-pills.component';
import { PlayerDetailPillsComponentPageModel, PlayerDetailPillsPlayerPageModel } from './player-detail-pills.component.pagemodel';

describe('Player Table', () => {
    let targetViewModel: PlayerDetailPillsComponent;
    let pageModel: PlayerDetailPillsComponentPageModel;
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
                PlayerDetailPillsComponent,
                AbbreviateNumberPipe
            ]
        });

        await TestBed.compileComponents();

        const fixture = TestBed.createComponent(PlayerDetailPillsComponent);
        targetViewModel = fixture.componentInstance;
        targetViewModel.players = TestPlayerData;
        pageModel = new PlayerDetailPillsComponentPageModel(fixture);
        await pageModel.waitForUpdates();
    });

    it('should have 3 combatants', () => {
        expect(pageModel.getPlayers().length)
            .toBe(3);
    });

    describe('first combatant', () => {
        let playerPageModel: PlayerDetailPillsPlayerPageModel;

        beforeEach(() => {
            playerPageModel = pageModel.getPlayers()[0];
        });

        it('should be Monk Monk', () => {
            expect(playerPageModel.getPlayerName())
                .toBe('Monk Monk');
        });

        it('should have correct DPS', () => {
            expect(playerPageModel.getPlayerDps())
                .toBe('2500');
        });

        it('should have correct icon name', () => {
            expect(playerPageModel.getPlayerIconName())
                .toBe('MNK');
        });

        it('should have correct maxhit', () => {
            expect(playerPageModel.getPlayerMaxHit())
                .toBe('25k - Woah');
        });

        it('should not be main player', () => {
            expect(playerPageModel.playerDpsHasMainPlayerClass())
                .toBeFalse();

            expect(playerPageModel.playerNameHasMainPlayerClass())
                .toBeFalse();
        });
    });

    describe('second combatant', () => {
        let playerPageModel: PlayerDetailPillsPlayerPageModel;

        beforeEach(() => {
            playerPageModel = pageModel.getPlayers()[1];
        });

        it('should be Paladin Paladin', () => {
            expect(playerPageModel.getPlayerName())
                .toBe('Paladin Paladin');
        });

        it('should have correct DPS', () => {
            expect(playerPageModel.getPlayerDps())
                .toBe('2000');
        });

        it('should have correct icon name', () => {
            expect(playerPageModel.getPlayerIconName())
                .toBe('PLD');
        });

        it('should have correct maxhit', () => {
            expect(playerPageModel.getPlayerMaxHit())
                .toBe('15k - Sword');
        });

        it('should not be main player', () => {
            expect(playerPageModel.playerDpsHasMainPlayerClass())
                .toBeTrue();

            expect(playerPageModel.playerNameHasMainPlayerClass())
                .toBeTrue();
        });
    });

    describe('third combatant', () => {
        let playerPageModel: PlayerDetailPillsPlayerPageModel;

        beforeEach(() => {
            playerPageModel = pageModel.getPlayers()[2];
        });

        it('should be Scholar Scholar', () => {
            expect(playerPageModel.getPlayerName())
                .toBe('Scholar Scholar');
        });

        it('should have correct DPS', () => {
            expect(playerPageModel.getPlayerDps())
                .toBe('1500');
        });

        it('should have correct icon name', () => {
            expect(playerPageModel.getPlayerIconName())
                .toBe('SCH');
        });

        it('should have correct maxhit', () => {
            expect(playerPageModel.getPlayerMaxHit())
                .toBe('10k - Book');
        });

        it('should not be main player', () => {
            expect(playerPageModel.playerDpsHasMainPlayerClass())
                .toBeFalse();

            expect(playerPageModel.playerNameHasMainPlayerClass())
                .toBeFalse();
        });
    });
});