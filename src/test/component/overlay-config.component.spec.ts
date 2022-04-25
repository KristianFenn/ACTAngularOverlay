import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { OverlayConfigComponent } from 'src/app/component/overlay-config.component';
import { IConfigService } from 'src/app/service/config.service';
import { EventDispatcher } from 'src/app/service/event.dispatcher';
import { OverlayConfig, Layout, Theme } from 'src/app/models/config.model';
import { OverlayConfigComponentPageModel } from './overlay-config.component.pagemodel';

describe('Overlay Config', () => {
    let targetViewModel: OverlayConfigComponent;
    let mockConfigService: IConfigService;
    let overlayConfig: OverlayConfig;
    let pageModel: OverlayConfigComponentPageModel;

    beforeEach(async () => {
        overlayConfig = new OverlayConfig();

        mockConfigService = {
            onConfigChanged: new EventDispatcher<OverlayConfig>(),
            getConfiguration: () => overlayConfig,
            setConfig: () => {},
            getCurrentLayout: () => Layout.Bars
        };

        TestBed.configureTestingModule({ 
            imports: [ FormsModule ],
            providers: [{ provide: IConfigService, useValue: mockConfigService }],
            declarations: [ OverlayConfigComponent ]
        });
        const fixture = TestBed.createComponent(OverlayConfigComponent);
        targetViewModel = fixture.componentInstance;
        
        fixture.detectChanges();
        await fixture.whenStable();

        pageModel = new OverlayConfigComponentPageModel(fixture);
    });

    it('should create', () => {
        expect(targetViewModel)
            .toBeDefined();
    });

    describe('alliance layout configuration', () => {
        it('should render an option for each layout option', () => {
            const expected = Object.values(Layout);
            const layoutOptions = pageModel.getAllianceLayoutOptions();

            expect(layoutOptions.length)
                .toBe(expected.length);

            for(const layout of expected) {
                expect(layoutOptions)
                    .toContain(layout); 
            }
        });

        it('should default to table layout for alliance', () => {
            expect(pageModel.getSelectedAllianceLayout())
                .toBe(Layout.Table);

            expect(targetViewModel.isActiveAllianceLayout(Layout.Table))
                .toBeTrue();
        });

        it('should switch to bars layout when clicked', () => {
            pageModel.clickAllianceLayoutOption(Layout.Bars);

            expect(pageModel.getSelectedAllianceLayout())
                .toBe(Layout.Bars);

            expect(targetViewModel.isActiveAllianceLayout(Layout.Bars))
                .toBeTrue();
        });

        it('should switch to pills layout when clicked', () => {
            pageModel.clickAllianceLayoutOption(Layout.Pills);

            expect(pageModel.getSelectedAllianceLayout())
                .toBe(Layout.Pills);

            expect(targetViewModel.isActiveAllianceLayout(Layout.Pills))
                .toBeTrue();
        });
    });

    describe('party layout configuration', () => {
        it('should render an option for each layout option', () => {
            const expected = Object.values(Layout);
            const layoutOptions = pageModel.getPartyLayoutOptions();

            expect(layoutOptions.length)
                .toBe(expected.length);

            for(const layout of expected) {
                expect(layoutOptions)
                    .toContain(layout); 
            }
        });

        it('should default to bars layout for party', () => {
            expect(pageModel.getSelectedPartyLayout())
                .toBe(Layout.Bars);

            expect(targetViewModel.isActivePartyLayout(Layout.Bars))
                .toBeTrue();
        });

        it('should switch to table layout when clicked', () => {
            pageModel.clickPartyLayoutOption(Layout.Table);

            expect(pageModel.getSelectedPartyLayout())
                .toBe(Layout.Table);

            expect(targetViewModel.isActivePartyLayout(Layout.Table))
                .toBeTrue();
        });

        it('should switch to pills layout when clicked', () => {
            pageModel.clickPartyLayoutOption(Layout.Pills);

            expect(pageModel.getSelectedPartyLayout())
                .toBe(Layout.Pills);

            expect(targetViewModel.isActivePartyLayout(Layout.Pills))
                .toBeTrue();
        });
    });

    describe('themes configuration', () => {
        it('should render an option for each theme option', () => {
            const expected = Object.values(Theme);
            const themeOptions = pageModel.getThemeOptions();

            expect(themeOptions.length)
                .toBe(expected.length);

            for(const layout of expected) {
                expect(themeOptions)
                    .toContain(layout); 
            }
        });

        it('should default to ffxiv theme', () => {
            expect(pageModel.getSelectedTheme())
                .toBe(Theme.FFXIV);

            expect(targetViewModel.isActiveTheme(Theme.FFXIV))
                .toBeTrue();
        });

        it('should switch to fflogs theme when clicked', () => {
            pageModel.clickThemeOption(Theme.FFLogs);

            expect(pageModel.getSelectedTheme())
                .toBe(Theme.FFLogs);

            expect(targetViewModel.isActiveTheme(Theme.FFLogs))
                .toBeTrue();
        });
    });

    describe('font size configuration', () => {
        it('should default to 16px', () => {
            expect(pageModel.getFontSize())
                .toBe(16);

            expect(targetViewModel.fontSize)
                .toBe(16);
        });

        it('should increment', () => {
            pageModel.incrementFontSize();

            expect(pageModel.getFontSize())
                .toBe(17);

            expect(targetViewModel.fontSize)
                .toBe(17);
        });

        it('should decrement', () => {
            pageModel.decrementFontSize();

            expect(pageModel.getFontSize())
                .toBe(15);

            expect(targetViewModel.fontSize)
                .toBe(15);
        });

        it('should decrement', () => {
            pageModel.decrementFontSize();

            expect(pageModel.getFontSize())
                .toBe(15);

            expect(targetViewModel.fontSize)
                .toBe(15);
        });

        it('should set', () => {
            pageModel.setFontSize(20);

            expect(pageModel.getFontSize())
                .toBe(20);

            expect(targetViewModel.fontSize)
                .toBe(20);
        });
    });

    describe('autohide configuration', () => {
        it('should default to 0', () => {
            expect(pageModel.getAutohide())
                .toBe(0);

            expect(targetViewModel.autohide)
                .toBe(0);
        });

        it('should increment', () => {
            pageModel.incrementAutohide();

            expect(pageModel.getAutohide())
                .toBe(1);

            expect(targetViewModel.autohide)
                .toBe(1);
        });

        it('should decrement', () => {
            pageModel.setAutohide(30);
            pageModel.decrementAutohide();

            expect(pageModel.getAutohide())
                .toBe(29);

            expect(targetViewModel.autohide)
                .toBe(29);
        });

        it('should not allow negative values', () => {
            pageModel.decrementAutohide();

            expect(pageModel.getAutohide())
                .toBe(0);

            expect(targetViewModel.autohide)
                .toBe(0);
        });

        it('should set', () => {
            pageModel.setAutohide(30);

            expect(pageModel.getAutohide())
                .toBe(30);

            expect(targetViewModel.autohide)
                .toBe(30);
        });
    });

    describe('set options', () => {
        it('should call service with default config', () => {
            spyOn(mockConfigService, 'setConfig');

            pageModel.clickSetOptions();

            const expected = new OverlayConfig;
            expected.theme = Theme.FFXIV;
            expected.partyLayout = Layout.Bars;
            expected.allianceLayout = Layout.Table;
            expected.autohide = 0;
            expected.fontSize = 16;
            expected.mainPlayerName = 'YOU';
            expected.test = '';

            expect(mockConfigService.setConfig)
                .toHaveBeenCalledOnceWith(expected);
        });

        it('should call service with updated options', () => {
            pageModel.clickThemeOption(Theme.FFLogs);
            pageModel.clickPartyLayoutOption(Layout.Table);
            pageModel.clickAllianceLayoutOption(Layout.Pills);
            pageModel.setAutohide(30);
            pageModel.setFontSize(12);

            spyOn(mockConfigService, 'setConfig');

            pageModel.clickSetOptions();

            const expected = new OverlayConfig;
            expected.theme = Theme.FFLogs;
            expected.partyLayout = Layout.Table;
            expected.allianceLayout = Layout.Pills;
            expected.autohide = 30;
            expected.fontSize = 12;
            expected.mainPlayerName = 'YOU';
            expected.test = '';

            expect(mockConfigService.setConfig)
                .toHaveBeenCalledOnceWith(expected);
        });
    });
});