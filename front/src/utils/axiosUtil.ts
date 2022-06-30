import axios, { AxiosPromise, HasThen } from 'axios';
import { ResponseType } from '@src/@types/api';
import { AuthStorage } from '@src/data/browser-storage-impI/AuthStorage';

/**
 * 공통 ajax 처리
 * 중복 코드 제거 및 공통 에러 처리를 위해 axios 를 한번 감싸서 리턴한다.
 * 에러 캐치를 해당 로직에서 처리하고 있으므로 항상 이행된 프로미스만 반환한다는 것을 보장한다.
 * */
const instance = axios.create({
    //baseURL: 'http://49.254.11.198:8080/',
    //baseURL: 'http://49.254.179.209:8080/',
    baseURL: 'http://localhost:8080/',
    timeout: 3000,
    withCredentials: true,
});

// 모든 API 요청 전 인터셉터
instance.interceptors.request.use(config => {
    config.headers.common['Authorization'] = AuthStorage.get()?.getAccessToken(); // 로그인 전에는 브라우저 저장소에 토큰 값이 없다.
    return config;
});

// 모든 API 응답 전 인터셉터
instance.interceptors.response.use(response => {
    const { data, status } = response.data;

    if (status === 'AUTH_EXPIRED') {
        console.log(`[${status}] => AccessToken 갱신`);

        const { accessToken: newAccessToken } = data;
        AuthStorage.update({ _accessToken: `Bearer ${newAccessToken}` }); // 토큰 갱신
        response.config.headers['Authorization'] = `Bearer ${newAccessToken}`; // 실제 응답 받기 전 재요청 시 한번 사용된다.
        return instance.request(response.config);
    } else if (status === 'AUTH_END') {
        console.log(`[${status}] => RefreshToken 유효 기간 종료 (다시 로그인)`);

        AuthStorage.remove(); // 브라우저에 저장된 인증 정보 삭제
        //location.href = '/common/login'; // 로그인 페이지로 이동
    } else if (status === 'NON_AUTHED') {
        console.log(`[${status}] => 인증 정보 못찾음 (다시 로그인)`);

        AuthStorage.remove(); // 브라우저에 저장된 인증 정보 삭제
        //location.href = '/common/login'; // 로그인 페이지로 이동
    }
    return response;
});

export const sendApi = {
    get(url: string, payload: any) {
        return instance.get(url, { params: payload }).catch(err => fail(err)) as HasThen<ResponseType>;
    },

    post(url: string, payload: any) {
        return instance.post(url, { data: payload }).catch(err => fail(err)) as HasThen<ResponseType>;
    },

    put(url: string, payload: any) {
        return instance.post(url, { data: payload }).catch(err => fail(err)) as HasThen<ResponseType>;
    },

    delete(url: string, payload: any) {
        return instance.post(url, { data: payload }).catch(err => fail(err)) as HasThen<ResponseType>;
    },

    all(promises: Array<AxiosPromise>) {
        return axios.all(promises).catch(err => fail(err));
    },
};

function fail(err: Error) {
    console.log(err); // api 통신 에러
}
