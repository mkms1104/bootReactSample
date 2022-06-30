/* agGrid 모듈에 새로운 타입을 추가한다. */
import { DetailGridInfo } from 'ag-grid-community';

declare module 'ag-grid-community' {
    export type Api = Pick<DetailGridInfo, 'api'>;
}
