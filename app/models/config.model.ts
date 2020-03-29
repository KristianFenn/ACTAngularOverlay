import PlayerTableField from './player-table.model';
import Player from './player.model';

const AutoSizeThreshold = 10;

export interface Theme {
    name: string;
    class: string;
}

export interface Layout {
    name: string;
    auto: boolean;
}

export const Themes: Theme[] = [
    { name: 'ffxiv', class: 'theme-ffxiv' },
    { name: 'fflogs', class: 'theme-fflogs' },
];

export const Layouts: Layout[] = [
    { name: 'bars', auto: false },
    { name: 'table', auto: false },
    { name: 'auto', auto: true }
];

export default class OverlayConfig {
    theme = Themes[0];
    layout = Layouts[0];
    playerName = "YOU";
    scale = 1.0;
    test = '';
    testMode = false;
    
    private mainPlayerFn = (p: Player) => p.isMainPlayer() ? 'main-player' : '';
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
                return 'table'
            } else {
                return 'bars'
            }
        }

        return this.layout.name;
    }
}
