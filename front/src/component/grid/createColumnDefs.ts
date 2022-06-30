import { ColDef, ColGroupDef } from 'ag-grid-community';

/**
 * grid Column 선언 객체화
 * 타입스크립트 이점을 최대한 활용하기 위해 작성
 * */
class CreateColumnDefs implements ColDef {
    readonly headerName;
    readonly field;

    constructor(headerName: string, field: string) {
        this.headerName = headerName;
        this.field = field;
    }

    static concat(...cols: ColDef[]) {
        return cols;
    }

    addOptions(col: ColDef | ColGroupDef) {
        return {
            headerName: this.headerName,
            field: this.field,
            ...col,
        };
    }
}

export { CreateColumnDefs };
