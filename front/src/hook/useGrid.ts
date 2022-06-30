import { useState } from 'react';
import { GridReadyEvent } from 'ag-grid-community';

/**
 * grid Api 핸들링을 위한 전용 훅
 * AgGrid 의 비동기 초기화 특성 상 최초 컴포넌트 로드 시 api 정보가 존재하지 않을 수 있다.
 * */
function useGrid() {
    const [api, setGridReady] = useState<GridReadyEvent>();
    return { api: api?.api, columnApi: api?.columnApi, setGridReady };
}

export default useGrid;
