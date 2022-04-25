import { Predicate, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

export class Via {
    static TestClass(testClass: string): Predicate<DebugElement> {
        return By.css(`[data-test-class="${testClass}"]`);
    }

    static TestId(testId: string): Predicate<DebugElement> {
        return By.css(`[data-test-id="${testId}"]`);
    }
}