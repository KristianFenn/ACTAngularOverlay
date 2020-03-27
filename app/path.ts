export default class Path {
    static GetHtml(fileName: string) {
        return 'assets/html/' + fileName;
    }

    static GetCss(filename: string) {
        return 'assets/css/' + filename;
    }
}