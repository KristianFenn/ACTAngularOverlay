import * as qs from 'query-string';

export default class Configuration {
    static Theme = "ffxiv";
    static Layout = "dps-bars";
    static PlayerName = "YOU";

    static SetOptions(queryString: string) {
        let parsed = qs.parse(queryString) as any;
        
        if (parsed.playerName) {
            this.PlayerName = parsed.playerName;
        }

        if (parsed.theme) {
            this.Theme = parsed.theme;
        }

          if (parsed.layout) {
            this.Layout = parsed.layout;
        }

    }

    static GetLayoutPath(fileName: string) {
        return 'layouts/' + this.Layout + '/' + fileName;
    }

    static GetClassTheme() {
        return 'layouts/themes/' + this.Theme + '.css';
    }

    static GetSharedPath(fileName: string) {
        return 'layouts/shared/' + fileName;
    }
}