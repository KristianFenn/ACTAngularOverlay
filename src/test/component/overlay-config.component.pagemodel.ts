import { DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { OverlayConfigComponent } from 'src/app/component/overlay-config.component';
import { Via } from '../Via';
import { Layout, Theme } from 'src/app/models/config.model';
import { BasePageModel } from './base.pagemodel';

const partyOptionsTestClass = 'config-party-layout-option';
const allainceOptionsTestClass = 'config-alliance-layout-option';
const themeOptionsTestClass = 'config-theme-option';
const fontSizeTestId = 'config-font-size';
const autohideTestId = 'config-autohide';
const setOptionsTestId = 'config-set-options';

export class OverlayConfigComponentPageModel extends BasePageModel<OverlayConfigComponent> {
    constructor(fixture: ComponentFixture<OverlayConfigComponent>) {
        super(fixture);
    }
    
    private getOptionElement(testClass: string, optionName: string): DebugElement {
        const option = this.getElementsByTestClass(testClass)
            .filter(ele => ele.nativeElement.text == optionName);
        
        if (option.length > 1) {
            throw `Multiple elements with text ${optionName} for test class ${testClass}`
        }

        return option[0];
    }

    private getOptionsElementsText(testClass: string): string[] {
        return this.getElementsByTestClass(testClass)
            .map(de => de.nativeElement.text);
    }

    private getSelectedOptionElement(testClass: string): DebugElement {
        const selected = this.getElementsByTestClass(testClass)
            .filter(layoutEle => layoutEle.classes["active"]);

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
        return this.getOptionsElementsText(partyOptionsTestClass);
    }

    getSelectedPartyLayout(): string {
        return this.getSelectedOptionText(partyOptionsTestClass);
    }

    clickPartyLayoutOption(option: Layout): void {
        this.clickOptionElement(partyOptionsTestClass, option);
    }
    
    getAllianceLayoutOptions(): string[] {
        return this.getOptionsElementsText(allainceOptionsTestClass);
    }

    getSelectedAllianceLayout(): string {
        return this.getSelectedOptionText(allainceOptionsTestClass);
    }

    clickAllianceLayoutOption(option: Layout): void {
        this.clickOptionElement(allainceOptionsTestClass, option);
    }
    
    getThemeOptions(): string[] {
        return this.getOptionsElementsText(themeOptionsTestClass);
    }

    getSelectedTheme(): string {
        return this.getSelectedOptionText(themeOptionsTestClass);
    }

    clickThemeOption(option: Theme): void {
        this.clickOptionElement(themeOptionsTestClass, option);
    }

    getFontSize(): number {
        return parseInt(this.getElementByTestId(fontSizeTestId).nativeElement.value);
    }

    incrementFontSize(): void {
        this.incrementNumberInput(fontSizeTestId);
    }
    
    decrementFontSize(): void {
        this.decrementNumberInput(fontSizeTestId);
    }

    setFontSize(value: number) {
        this.setInputValue(fontSizeTestId, value.toString());
    }

    getAutohide(): number {
        return parseInt(this.getElementByTestId(autohideTestId).nativeElement.value);
    }

    incrementAutohide(): void {
        this.incrementNumberInput(autohideTestId);
    }
    
    decrementAutohide(): void {
        this.decrementNumberInput(autohideTestId);
    }

    setAutohide(value: number) {
        this.setInputValue(autohideTestId, value.toString());
    }

    clickSetOptions() {
        this.clickElementByTestId(setOptionsTestId);
    }
}