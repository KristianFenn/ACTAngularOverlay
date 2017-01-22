export class PlayerTableField {
    width: number;
    fieldName: string;
    fieldTitle: string;
    cssClass: (value: any) => string;

    constructor(width: number, field: string, title: string, cssClass: (value: any) => string = null) {
        this.width = width;
        this.fieldName = field;
        this.fieldTitle = title;
        this.cssClass = cssClass || ((value) => "");
    }
}