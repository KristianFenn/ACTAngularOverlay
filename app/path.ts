export default class Path {
    static GetHtml(fileName: string) {
        return `assets/html/${fileName}.html`;
    }

    static GetCss(filename: string) {
        return `assets/css/${filename}.css`;
    }
}