import * as qs from 'query-string';

export default class Configuration {
    static Theme = "dps-bars";
    static PlayerName = "YOU";

    static SetOptions(queryString: string) {
        let parsed = qs.parse(queryString) as any;
        
        if (parsed.playerName) {
            this.PlayerName = parsed.playerName;
        }

        if (parsed.theme) {
            this.Theme = parsed.theme;
        }
    }

    static GetThemePath(fileName: string) {
        return 'themes/' + this.Theme + '/' + fileName;
    }

    static GetSharedPath(fileName: string) {
        return 'themes/shared/' + fileName;
    }
}