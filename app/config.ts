import * as qs from 'query-string';

interface QueryString {
    playerName: string;
    theme: string;
    layout: string;
    scale: number;
    test: boolean;
}

export default class Configuration {
    static Themes = [
        'ffxiv',
        'fflogs'
    ];

    static Layouts = [
        'dps-bars',
        'table'
    ];

    static Theme = 'ffxiv';
    static Layout = 'dps-bars';
    static PlayerName = "YOU";
    static Scale = 1.0;
    static Test = false;

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
        return qs.parse(location.search) as any as QueryString;
    }

    static ReloadWithOptions(theme: string, layout: string, scale: number) {
        let query = this.GetQueryString();
        query.layout = layout;
        query.theme = theme;
        query.scale = scale;
        var queryString = qs.stringify(query);
        location.href = location.origin + '?' + queryString;
    }
}
