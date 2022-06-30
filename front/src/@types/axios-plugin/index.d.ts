import { AxiosResponse } from 'axios';

/* axios 모듈에 새로운 타입을 추가한다. */
declare module 'axios' {
    export type HasThen<T> = Pick<Promise<AxiosResponse<T>>, 'then'>; // Promise 에서 then 속성만 리턴한다.
}
