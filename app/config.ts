import * as qs from 'query-string';
import PlayerTableField from './models/player-table.model';
import Player from './models/player.model';

const PlayerTableThreshold = 10;

interface QueryString {
    playerName: string;
    theme: Theme;
    layout: Layout;
    scale: number;
    test: boolean;
}

export enum Layout {
    Bars,
    Table,
    Auto
}

export enum Theme {
    Ffxiv,
    Fflogs
}

export default class Configuration {
    static Theme = Theme.Ffxiv;
    static Layout = Layout.Bars;
    static PlayerName = "YOU";
    static Scale = 1.0;
    static Test = false;
    
    private static mainPlayerFn = (p: Player) => p.isMainPlayer() ? 'main-player' : '';
    private static redTextFn = (v: number) => v > 0 ? 'text-red' : '';

    static TableFields = [
      new PlayerTableField(10, "Rank",  (p) => p.rank,Configuration.mainPlayerFn),
      new PlayerTableField(10, "Class", (p) => p.class, null, true),
      new PlayerTableField(30, "Player", (p) => p.name, Configuration.mainPlayerFn),
      new PlayerTableField(10, "DPS", (p) => p.dps, Configuration.mainPlayerFn),
      new PlayerTableField(40, "Highest Hit", (p) => p.maxhit),
      new PlayerTableField(10, "Death", (p) => p.deaths, (p) => Configuration.redTextFn(p.deaths))
    ];

    static ShouldShowTable(playerCount: number) {
        var shouldShowTable = Configuration.Layout == Layout.Table ||
          (Configuration.Layout == Layout.Auto
            && playerCount >= PlayerTableThreshold);

        console.log(`playerCount: ${playerCount}, shouldShowTable: ${shouldShowTable}`);

        return shouldShowTable;
    }

    static SetOptions() {
        let parsed = this.GetQueryString();
        
        if (parsed.playerName) {
            this.PlayerName = parsed.playerName;
        }

        if (parsed.theme) {
            this.Theme = parsed.theme;
        }

        if (parsed.layout) {
            this.Layout = parsed.layout;
        }

        if (parsed.scale) {
            this.Scale = parsed.scale;
        }

        if (parsed.test) {
            this.Test = parsed.test;
        }
    }

    static GetThemeClass() {
        switch (+this.Theme) {
            case Theme.Ffxiv:
                return 'theme-ffxiv';
            case Theme.Fflogs:
                return 'theme-fflogs';
        }
    }

    private static GetQueryString() {
        return qs.parse(location.search) as any as QueryString;
    }

    static ReloadWithOptions(theme: Theme, layout: Layout, scale: number) {
        let query = this.GetQueryString();
        query.layout = layout;
        query.theme = theme;
        query.scale = scale;
        var queryString = qs.stringify(query);
        location.href = location.origin + '?' + queryString;
    }
}
