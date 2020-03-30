export default class Path {
    static GetHtml(htmlName: string) {
        return `assets/html/${htmlName}.html`;
    }

    static GetCss(cssName: string) {
        return `assets/css/${cssName}.css`;
    }

    static GetIcon(iconName: string) {
        return `icons/${iconName}.png`;
    }
}