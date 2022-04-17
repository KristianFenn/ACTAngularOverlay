import PlayerTableField from './player-table.model';
import Player from './player.model';

const AutoSizeThreshold = 10;

export enum Layout {
    Bars = "bars",
    Table = "table",
    Pills = "pills"
}

export enum Theme {
    FFXIV = "ffxiv",
    FFLogs = "fflogs"
}

export default class OverlayConfig {
    theme = Theme.FFXIV;
    partyLayout = Layout.Bars;
    allianceLayout = Layout.Table;
    mainPlayerName = "YOU";
    fontSize = 16;
    test = '';
    autohide = 0;
    
    private mainPlayerFn = (p: Player) => this.isMainPlayer(p)  ? 'main-player' : '';
    private redTextFn = (v: number) => v > 0 ? 'text-red' : '';

    tableFields = [
      new PlayerTableField(10, "DPS", (p) => p.dps, this.mainPlayerFn),
      new PlayerTableField(10, "Class", (p) => p.class, () => "", true),
      new PlayerTableField(30, "Player", (p) => p.name, this.mainPlayerFn),
      new PlayerTableField(40, "Highest Hit", (p) => p.maxhit, () => ""),
      new PlayerTableField(10, "Death", (p) => p.deaths, (p) => this.redTextFn(p.deaths))
    ];

    getCurrentLayout(playerCount: number) {
        if (playerCount >= AutoSizeThreshold) {
            return this.allianceLayout;
        } else {
            return this.partyLayout;
        }
    }

    isMainPlayer(player: Player) {
        return player.name == this.mainPlayerName;
    }
}
