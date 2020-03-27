import Player from './player.model';

export default class PlayerTableField {
    width: number;
    valueFn: (player: Player) => any;
    fieldTitle: string;
    cssClass: (value: Player) => string;
    isIcon: boolean;

    getClass(player: Player) {
        return this.cssClass(player);
    }

    getValue(player: Player) {
        return this.valueFn(player);
    }

    constructor(width: number, title: string, valueFn: (player: Player) => any, cssClass: (player: Player) => string = null, isIcon: boolean = false) {
        this.width = width;
        this.fieldTitle = title;
        this.valueFn = valueFn;
        this.cssClass = cssClass || ((value) => "");
        this.isIcon = isIcon;
    }
}