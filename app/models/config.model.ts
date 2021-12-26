import PlayerTableField from './player-table.model';
import Player from './player.model';

const AutoSizeThreshold = 10;

export const BarsLayout = 'bars';
export const TableLayout = 'table';
export const AutoLayout = 'auto';

export interface Theme {
    name: string;
    class: string;
}

export class Layout {
    name: string;
    auto: boolean;
}

export const Themes: Theme[] = [
    { name: 'ffxiv', class: 'theme-ffxiv' },
    { name: 'fflogs', class: 'theme-fflogs' },
];

export const Layouts: Layout[] = [
    { name: BarsLayout, auto: false },
    { name: TableLayout, auto: false },
    { name: AutoLayout, auto: true }
];

export default class OverlayConfig {
    theme = Themes[0];
    layout = Layouts[0];
    mainPlayerName = "YOU";
    fontSize = 16;
    test = '';
    autohide = 0;
    
    private mainPlayerFn = (p: Player) => this.isMainPlayer(p)  ? 'main-player' : '';
    private redTextFn = (v: number) => v > 0 ? 'text-red' : '';

    tableFields = [
      new PlayerTableField(10, "DPS", (p) => p.dps, this.mainPlayerFn),
      new PlayerTableField(10, "Class", (p) => p.class, null, true),
      new PlayerTableField(30, "Player", (p) => p.name, this.mainPlayerFn),
      new PlayerTableField(40, "Highest Hit", (p) => p.maxhit),
      new PlayerTableField(10, "Death", (p) => p.deaths, (p) => this.redTextFn(p.deaths))
    ];


    getCurrentLayout(playerCount: number) {
        if (this.layout.auto) {
            if (playerCount >= AutoSizeThreshold) {
                return TableLayout;
            } else {
                return BarsLayout;
            }
        }

        return this.layout.name;
    }

    isMainPlayer(player: Player) {
        return player.name == this.mainPlayerName;
    }
}
