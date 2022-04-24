import { ComponentFixture } from '@angular/core/testing';
import { Via } from '../Via';
import { DebugElement } from '@angular/core';
import { HttpBackend } from '@angular/common/http';

export class BasePageModel<T> {
    private _fixture: ComponentFixture<T>;

    constructor(fixture: ComponentFixture<T>) {
        this._fixture = fixture;
    }

    async waitForUpdates() {
        this._fixture.detectChanges();
        await this._fixture.whenStable();
    }

    protected elementVisible(testId: string): boolean {
        const element = this._fixture.debugElement.query(Via.TestId(testId));
        
        if (element) {
            return !(element.nativeElement as HTMLElement).hidden;
        }

        return false;
    }
    
    protected getElementByTestId(testId: string): DebugElement {
        const element = this._fixture.debugElement.query(Via.TestId(testId));

        if (!element) {
            throw `Could not find any element with testId ${testId}`;
        }

        return element;
    }

    protected getElementsByTestClass(testClass: string): DebugElement[] {
        const elements = this._fixture.debugElement.queryAll(Via.TestClass(testClass));

        if (!elements) {
            throw `Could not find any elements with testClass ${testClass}`;
        }

        return elements;
    }

    protected getElementTextByTestId(testId: string): string {
        const element = this.getElementByTestId(testId);
        const text = (element.nativeElement as HTMLElement).textContent;

        if (text == null) {
            throw `Element with testId ${testId} has no text content`;
        }

        return text;
    }

    protected clickElement(element: DebugElement): void {
        (element.nativeElement as HTMLInputElement).dispatchEvent(new Event('click'));
        this._fixture.detectChanges();
    }

    protected clickElementByTestId(testId: string): void {
        this.getElementByTestId(testId).nativeElement.dispatchEvent(new Event('click'));
        this._fixture.detectChanges();
    }

    protected getInputElementByTestId(testId: string): HTMLInputElement {
        const input = this.getElementByTestId(testId).nativeElement as HTMLElement;

        if (input.nodeName != 'INPUT') {
            throw `Element with testId ${testId} is not an input element.`;
        }

        return input as HTMLInputElement;
    }

    protected incrementNumberInput(testId: string) {
        const element = this.getElementByTestId(testId).nativeElement as HTMLInputElement;
        element.stepUp();
        element.dispatchEvent(new Event('input'));
    }

    protected decrementNumberInput(testId: string): void {
        const element = this.getElementByTestId(testId).nativeElement as HTMLInputElement;
        element.stepDown();
        element.dispatchEvent(new Event('input'));
    }

    protected setInputValue(testId: string, value: string): void {
        const element = this.getElementByTestId(testId).nativeElement as HTMLInputElement;
        element.value = value;
        element.dispatchEvent(new Event('input'));
    }
}