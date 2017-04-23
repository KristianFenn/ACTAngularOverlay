import * as qs from 'query-string';

export default class Configuration {
    static Theme = "ffxiv";
    static Layout = "dps-bars";
    static PlayerName = "YOU";

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

    private static GetQueryString() {
        return qs.parse(location.search) as any;
    }

    static SetLayout(layout: string) {
        let query = this.GetQueryString();
        query.layout = layout;
        this.ReloadWithOptions(query);
    }

    static SetTheme(theme: string) {
        let query = this.GetQueryString();
        query.theme = theme;
        this.ReloadWithOptions(query);
    }

    private static ReloadWithOptions(query: any) {
        var queryString = qs.stringify(query);
        location.href = location.origin + '?' + queryString;
    }
}
