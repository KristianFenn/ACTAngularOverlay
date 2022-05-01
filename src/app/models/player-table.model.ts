import { Player } from './player.model';

export class PlayerTableField {
    cssClass: (value: Player) => string;
    isIcon: boolean;
    width: number;
    fieldTitle: string;
    valueFn: (player: Player) => string;

    getClass(player: Player) {
        return this.cssClass(player);
    }

    getValue(player: Player) {
        return this.valueFn(player);
    }

    constructor(width: number, title: string, valueFn: (player: Player) => string) {
        this.width = width;
        this.fieldTitle = title;
        this.valueFn = valueFn;
        this.cssClass = () => '';
        this.isIcon = false;
    }
}

export class DeathsPlayerTableField extends PlayerTableField {
    constructor(width: number, title: string) {
        super(width, title, p => p.deaths.toString());
        this.cssClass = p => p.deaths > 0 ? 'text-red' : '';
    }
}

export class MainPlayerTableField extends PlayerTableField {
    constructor(width: number, title: string, valueFn: (player: Player) => string, mainPlayerName: string) {
        super(width, title, valueFn);
        this.cssClass = p => p.name == mainPlayerName ? 'main-player' : '';
    }
} 

export class IconPlayerTableField extends PlayerTableField {
    constructor(width: number, title: string, valueFn: (player: Player) => string) {
        super(width, title, valueFn);
        this.isIcon = true;
    }
}