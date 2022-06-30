import { sendApi } from '@src/utils/axiosUtil';
import { on, off } from '@src/data/modules/loading';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'react';
import { HasThen } from 'axios';
import { ResponseType } from '@src/@types/api';

/**
 * 훅으로 랩핑하여 http 통신 사이에 로딩바를 보여준다.
 * 랩핑될 axios 객체를 교체할 수 있는 여지를 제공한다.
 * */
function useAxios() {
    const dispatch = useDispatch();
    //const sendApi = axios || new Axios();

    const sendApiHook = {
        get(url: string, payload: any) {
            return apiWrap(dispatch, sendApi.get(url, payload));
        },
        post(url: string, payload: any) {
            return apiWrap(dispatch, sendApi.post(url, payload));
        },
        put(url: string, payload: any) {
            return apiWrap(dispatch, sendApi.put(url, payload));
        },
        delete(url: string, payload: any) {
            return apiWrap(dispatch, sendApi.delete(url, payload));
        },
    };
    return sendApiHook;
}

async function apiWrap(dispatch: Dispatch<any>, doWork: HasThen<ResponseType>) {
    const showLoading = true; // 귀찮아서 일단 true
    try {
        showLoading && dispatch(on());
        return await doWork;
    } finally {
        showLoading && dispatch(off());
    }
}

export default useAxios;
