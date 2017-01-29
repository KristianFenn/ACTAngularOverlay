import { Player } from './player.model'

export class PlayerTableField {
    width: number;
    fieldName: string;
    fieldTitle: string;
    cssClass: (value: any) => string;

    getClass(player: Player) {
        return this.cssClass(player);
    }

    getValue(player: Player) {
        return player[this.fieldName];
    }

    constructor(width: number, field: string, title: string, cssClass: (player: Player) => string = null) {
        this.width = width;
        this.fieldName = field;
        this.fieldTitle = title;
        this.cssClass = cssClass || ((value) => "");
    }
}