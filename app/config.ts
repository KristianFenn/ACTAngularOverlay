export class Configuration {
    static Theme = "simple-bars";

    static GetThemePath(fileName: string) {
        return 'themes/' + this.Theme + '/' + fileName;
    }

    static GetGlobalPath(fileName: string) {
        return 'themes/global/' + fileName;
    }
}