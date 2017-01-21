export class PlayerTableField {
    width: number;
    fieldName: string;
    fieldTitle: string;

    constructor(width: number, field: string, title: string) {
        this.width = width;
        this.fieldName = field;
        this.fieldTitle = title;
    }
}