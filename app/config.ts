export default class Configuration {
    static Theme = "dps-bars";
    static PlayerName = "YOU";

    static GetThemePath(fileName: string) {
        return 'themes/' + this.Theme + '/' + fileName;
    }

    static GetSharedPath(fileName: string) {
        return 'themes/shared/' + fileName;
    }
}