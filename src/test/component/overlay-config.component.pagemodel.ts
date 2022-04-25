import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

import { OverlayConfigComponent } from 'src/app/component/overlay-config.component';
import { Layout, Theme } from 'src/app/models/config.model';
import { BasePageModel, TestSelectors } from './base.pagemodel';

const Selectors: TestSelectors = {
    TestClass: {
        partyOption: 'config-party-layout-option',
        allianceOption: 'config-alliance-layout-option',
        themeOption: 'config-theme-option',
    },
    TestId: {
        fontSize: 'config-font-size',
        autohide: 'config-autohide',
        setOptions: 'config-set-options'
    }
};

export class OverlayConfigComponentPageModel extends BasePageModel<OverlayConfigComponent> {
    constructor(fixture: ComponentFixture<OverlayConfigComponent>) {
        super(fixture);
    }
    
    private getOptionElement(testClass: string, optionName: string): DebugElement {
        const option = this.getElementsByTestClass(testClass)
            .filter(ele => ele.nativeElement.text == optionName);
        
        if (option.length > 1) {
            throw `Multiple elements with text ${optionName} for test class ${testClass}`;
        }

        return option[0];
    }

    private getOptionsElementsText(testClass: string): string[] {
        return this.getElementsByTestClass(testClass)
            .map(de => de.nativeElement.text);
    }

    private getSelectedOptionElement(testClass: string): DebugElement {
        const selected = this.getElementsByTestClass(testClass)
            .filter(layoutEle => layoutEle.classes['active']);

        if (selected.length > 1) {
            throw `Multiple items selected for test class ${testClass}`;
        }

        return selected[0];
    }

    private clickOptionElement(testClass: string, optionName: string) {
        const options = this.getOptionElement(testClass, optionName);
        this.clickElement(options);
    }

    private getSelectedOptionText(testClass: string): string {
        return this.getSelectedOptionElement(testClass)
            .nativeElement.text;
    }
    
    getPartyLayoutOptions(): string[] {
        return this.getOptionsElementsText(Selectors.TestClass.partyOption);
    }

    getSelectedPartyLayout(): string {
        return this.getSelectedOptionText(Selectors.TestClass.partyOption);
    }

    clickPartyLayoutOption(option: Layout): void {
        this.clickOptionElement(Selectors.TestClass.partyOption, option);
    }
    
    getAllianceLayoutOptions(): string[] {
        return this.getOptionsElementsText(Selectors.TestClass.allianceOption);
    }

    getSelectedAllianceLayout(): string {
        return this.getSelectedOptionText(Selectors.TestClass.allianceOption);
    }

    clickAllianceLayoutOption(option: Layout): void {
        this.clickOptionElement(Selectors.TestClass.allianceOption, option);
    }
    
    getThemeOptions(): string[] {
        return this.getOptionsElementsText(Selectors.TestClass.themeOption);
    }

    getSelectedTheme(): string {
        return this.getSelectedOptionText(Selectors.TestClass.themeOption);
    }

    clickThemeOption(option: Theme): void {
        this.clickOptionElement(Selectors.TestClass.themeOption, option);
    }

    getFontSize(): number {
        return parseInt(this.getElementByTestId(Selectors.TestId.fontSize).nativeElement.value);
    }

    incrementFontSize(): void {
        this.incrementNumberInput(Selectors.TestId.fontSize);
    }
    
    decrementFontSize(): void {
        this.decrementNumberInput(Selectors.TestId.fontSize);
    }

    setFontSize(value: number) {
        this.setInputValue(Selectors.TestId.fontSize, value.toString());
    }

    getAutohide(): number {
        return parseInt(this.getElementByTestId(Selectors.TestId.autohide).nativeElement.value);
    }

    incrementAutohide(): void {
        this.incrementNumberInput(Selectors.TestId.autohide);
    }
    
    decrementAutohide(): void {
        this.decrementNumberInput(Selectors.TestId.autohide);
    }

    setAutohide(value: number) {
        this.setInputValue(Selectors.TestId.autohide, value.toString());
    }

    clickSetOptions() {
        this.clickElementByTestId(Selectors.TestId.setOptions);
    }
}