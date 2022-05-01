import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { PlayerDetailBarsComponent } from 'src/app/component/layouts/player-detail-bars.component';
import { PlayerDetailBarsComponentPageModel, PlayerDetailBarsBarPageModel } from './player-detail-bars.component.pagemodel';
import { IConfigService } from 'src/app/service/config.service';
import { EventDispatcher } from 'src/app/service/event.dispatcher';
import { OverlayConfig, Layout, Theme } from 'src/app/models/config.model';
import { TestPlayerData } from 'src/test/test.data';
import { AbbreviateNumberPipe } from 'src/app/pipes/abbreviate-number.pipe';

describe('Bars Layout', () => {
    let targetViewModel: PlayerDetailBarsComponent;
    let pageModel: PlayerDetailBarsComponentPageModel;
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
                { provide: IConfigService, useValue: mockConfigService }
            ],
            schemas: [
                CUSTOM_ELEMENTS_SCHEMA,
                NO_ERRORS_SCHEMA
            ],
            declarations: [
                PlayerDetailBarsComponent,
                AbbreviateNumberPipe
            ]
        });

        await TestBed.compileComponents();

        const fixture = TestBed.createComponent(PlayerDetailBarsComponent);
        targetViewModel = fixture.componentInstance;
        targetViewModel.players = TestPlayerData;
        pageModel = new PlayerDetailBarsComponentPageModel(fixture);
        await pageModel.waitForUpdates();
    });

    it('should render 3 bars', () => {
        expect(pageModel.getPlayerBarCount())
            .toBe(3);
    });

    describe('first combatant', () => {
        let playerPageModel: PlayerDetailBarsBarPageModel;

        beforeEach(() => {
            playerPageModel = pageModel.getBarAtIndex(0);
        });

        it('should be Monk Monk', () => {
            expect(playerPageModel.getPlayerName())
                .toBe('Monk Monk');

            expect(playerPageModel.nameHasMainPlayerClass())
                .toBeFalse();
        });

        it('should have correct background width', () => {
            expect(playerPageModel.getPlayerBackgroundWidth())
                .toBe('100%');
        });

        it('should have correct dps', () => {
            expect(playerPageModel.getDpsValue())
                .toBe('2500');

            expect(playerPageModel.dpsHasMainPlayerClass())
                .toBeFalse();
        });

        it('should have correct icon', () => {
            expect(playerPageModel.getIconName())
                .toBe('MNK');
        });
        
        it('should have correct maxhit', () => {
            expect(playerPageModel.getMaxHit())
                .toBe('25k - Woah');
        });

        it('should have correct damage', () => {
            expect(playerPageModel.getTotalDamage())
                .toBe('25,000');
        });

        it('should have correct healing', () => {
            expect(playerPageModel.getHealing())
                .toBe('50 (0%)');
        });

        it('should have correct deaths', () => {
            expect(playerPageModel.getDeaths())
                .toBe('1');
            
            expect(playerPageModel.deathsHasTextRedClass()) 
                .toBeTrue();
        });

        it('should have correct crit info', () => {
            expect(playerPageModel.getCrits())
                .toBe('45% | 50% | 25%');
        });
    });

    describe('second combatant', () => {
        let playerPageModel: PlayerDetailBarsBarPageModel;

        beforeEach(() => {
            playerPageModel = pageModel.getBarAtIndex(1);
        });

        it('should be Paladin Paladin', () => {
            expect(playerPageModel.getPlayerName())
                .toBe('Paladin Paladin');

            expect(playerPageModel.nameHasMainPlayerClass())
                .toBeTrue();
        });

        it('should have correct background width', () => {
            expect(playerPageModel.getPlayerBackgroundWidth())
                .toBe('80%');
        });

        it('should have correct dps', () => {
            expect(playerPageModel.getDpsValue())
                .toBe('2000');

            expect(playerPageModel.dpsHasMainPlayerClass())
                .toBeTrue();
        });

        it('should have correct icon', () => {
            expect(playerPageModel.getIconName())
                .toBe('PLD');
        });
        
        it('should have correct maxhit', () => {
            expect(playerPageModel.getMaxHit())
                .toBe('15k - Sword');
        });

        it('should have correct damage', () => {
            expect(playerPageModel.getTotalDamage())
                .toBe('20,000');
        });

        it('should have correct healing', () => {
            expect(playerPageModel.getHealing())
                .toBe('200 (15%)');
        });

        it('should have correct deaths', () => {
            expect(playerPageModel.getDeaths())
                .toBe('0');
            
            expect(playerPageModel.deathsHasTextRedClass()) 
                .toBeFalse();
        });

        it('should have correct crit info', () => {
            expect(playerPageModel.getCrits())
                .toBe('35% | 30% | 15%');
        });
    });

    describe('third combatant', () => {
        let playerPageModel: PlayerDetailBarsBarPageModel;

        beforeEach(() => {
            playerPageModel = pageModel.getBarAtIndex(2);
        });

        it('should be Sage Sage', () => {
            expect(playerPageModel.getPlayerName())
                .toBe('Sage Sage');

            expect(playerPageModel.nameHasMainPlayerClass())
                .toBeFalse();
        });

        it('should have correct background width', () => {
            expect(playerPageModel.getPlayerBackgroundWidth())
                .toBe('60%');
        });

        it('should have correct dps', () => {
            expect(playerPageModel.getDpsValue())
                .toBe('1500');

            expect(playerPageModel.dpsHasMainPlayerClass())
                .toBeFalse();
        });

        it('should have correct icon', () => {
            expect(playerPageModel.getIconName())
                .toBe('SGE');
        });
        
        it('should have correct maxhit', () => {
            expect(playerPageModel.getMaxHit())
                .toBe('10k - Laser');
        });

        it('should have correct damage', () => {
            expect(playerPageModel.getTotalDamage())
                .toBe('15,000');
        });

        it('should have correct healing', () => {
            expect(playerPageModel.getHealing())
                .toBe('1,200 (30%)');
        });

        it('should have correct deaths', () => {
            expect(playerPageModel.getDeaths())
                .toBe('2');
            
            expect(playerPageModel.deathsHasTextRedClass()) 
                .toBeTrue();
        });

        it('should have correct crit info', () => {
            expect(playerPageModel.getCrits())
                .toBe('15% | 35% | 10%');
        });
    });
});