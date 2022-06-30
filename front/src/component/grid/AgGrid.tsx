import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

/**
 * 그리드 공통 Component
 * https://www.ag-grid.com/react-grid/
 * */
type gridProps = {
    columnDefs: ColDef[];
    rowData: any;
    setGridReady: React.Dispatch<React.SetStateAction<GridReadyEvent | undefined>>;
    isCheckbox?: boolean;
    pagination?: boolean;
};

function AgGrid({ columnDefs, rowData, setGridReady, isCheckbox = false, pagination = false }: gridProps): JSX.Element {
    // 체크박스
    if (isCheckbox) {
        gridOptions.rowSelection = 'multiple';
        gridOptions.rowMultiSelectWithClick = true;
        if (gridOptions.defaultColDef) {
            gridOptions.defaultColDef.headerCheckboxSelection = isFirstColumn; // 첫번째 열의 헤더에 체크 박스 추가
            gridOptions.defaultColDef.checkboxSelection = isFirstColumn; // 첫번째 열에 체크 박스 추가
            gridOptions.defaultColDef.headerCheckboxSelectionFilteredOnly = true; // 필터링된 행에 대해서만 체크한다.
        }
    }

    // 페이지네이션
    gridOptions.pagination = pagination;

    // 그리드 컴포넌트 생성(초기화) 이후 호출
    const onGridReady = (e: GridReadyEvent) => {
        e.api.sizeColumnsToFit(); // 현재 보이는 열을 화면 크기에 맞춘다.
        setGridReady(e); // 그리드 컴포넌트를 부모 컴포넌트에서 다룰 수 있도록 설정한다.
    };

    return (
        <div className="ag-theme-alpine">
            <AgGridReact
                onGridReady={onGridReady}
                columnDefs={columnDefs}
                rowData={rowData}
                gridOptions={gridOptions}
            ></AgGridReact>
        </div>
    );
}

// 기본 그리드 옵션을 정의한다.
// 기본 값 외의 옵션은 컴포넌트 생성 시 prop 값으로 설정한다. ex) 컬럼, 페이지네이션 등...
const gridOptions: GridOptions = {
    // noData Text
    localeText: { noRowsToShow: '조회 결과가 없습니다.' },

    // layout
    domLayout: 'autoHeight', // grid 를 감싸는 div 태그에 높이 설정을 하지 않아야 한다.

    // column Headers
    headerHeight: 50, // default 25px
    groupHeaderHeight: 50, // 미 작성 시 headerHeight 설정 값 사용

    // column options
    defaultColDef: {
        sortable: true, // 정렬
        filter: true, // 필터
        resizable: true, // 리사이징 불가
        editable: false, // 필드 편집 불가
        lockPosition: true, // 컬럼 이동 불가
        tooltipComponent: 'defaultTooltip',
    },

    // group column options
    /*defaultColGroupDef: {
        //marryChildren: true, // 각각의 그룹 밖으로 드래그 불가능
    },*/

    // define a column type (you can define as many as you like)
    columnTypes: {
        useEditableColumn: { editable: true }, // ex) { filed: ..., headerName: ..., type: ['useEditableColumn']}
    },

    rowHeight: 50,
    sortingOrder: ['desc', 'asc'], // 정렬 순서, default ['desc', 'asc', null]
    animateRows: true, // 정렬 애니메이션
    tooltipShowDelay: 0, // 툴팁 딜레이 (마우스 오버 시 기본 2초 후 표시)
    tooltipMouseTrack: true,

    // register custom component
    frameworkComponents: {
        // defaultTooltip: DefaultGridTooltip,
    },

    // pagination
    suppressPaginationPanel: true, // 기본 페이지네이션 이미지 미표시
    paginationPageSize: 10,
};

// 첫번째 컬럼 찾기
function isFirstColumn(params: any): boolean {
    const displayedColumns = params.columnApi.getAllDisplayedColumns();
    const thisIsFirstColumn = displayedColumns[0] === params.column;
    return thisIsFirstColumn;
}

export { AgGrid };
