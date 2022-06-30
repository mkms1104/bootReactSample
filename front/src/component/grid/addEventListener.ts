import { GridApi } from 'ag-grid-community';

type eventType =
    // ColumnEvent
    | 'columnPivotChanged'
    | 'columnRowGroupChanged'
    | 'columnValueChanged'
    | 'columnMoved'
    | 'columnResized'
    | 'columnVisible'
    | 'columnPinned'

    // RowEvent
    | 'rowSelected'
    | 'rowClicked'
    | 'rowDoubleClicked'
    | 'rowEditingStarted'
    | 'rowEditingStopped '
    | 'rowGroupOpened'
    | 'rowValueChanged'
    | 'virtualRowRemoved'

    // CellEvent
    | 'cellClicked'
    | 'cellMouseDown'
    | 'cellDoubleClicked'
    | 'cellMouseOver'
    | 'cellMouseOut'
    | 'cellContextMenu'
    | 'cellEditingStarted'
    | 'cellKeyDown'
    | 'cellKeyPress';

type CallbackFunction = () => void; // 글로벌 타입으로 빼야됨.

export function addGridEvent(api: GridApi | undefined, eventType: eventType, listener: CallbackFunction): void {
    api?.addEventListener(eventType, () => listener());
}
