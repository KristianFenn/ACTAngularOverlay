import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'abbreviateNumber'
})
export class AbbreviateNumberPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        const suffixes = ['k', 'm'];

        if (Number.isNaN(value)) {
            return null;
        }

        if (value < 1000) {
            return value;
        }

        const exp = Math.floor(Math.log(value) / Math.log(1000));

        return (value / Math.pow(1000, exp)).toFixed(args[0]) + suffixes[exp - 1];
    }
}