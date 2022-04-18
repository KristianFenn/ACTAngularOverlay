import { Player } from './player.model';

export class PlayerTableField {
    width: number;
    fieldTitle: string;
    valueFn: (player: Player) => any;
    cssClass: (value: Player) => string;
    isIcon: boolean;

    getClass(player: Player) {
        return this.cssClass(player);
    }

    getValue(player: Player) {
        return this.valueFn(player);
    }

    constructor(width: number, title: string, valueFn: (player: Player) => any, cssClass: (player: Player) => string, isIcon: boolean = false) {
        this.width = width;
        this.fieldTitle = title;
        this.valueFn = valueFn;
        this.cssClass = cssClass;
        this.isIcon = isIcon;
    }
}