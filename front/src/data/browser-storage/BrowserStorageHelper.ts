import BrowserStorageKey from '@src/data/browser-storage/BrowserStorageKey';

/**
 * 스토리지에 접근할 때 생기는 부수 작업을 처리한다.
 * ex) null 체크, json 파싱
 * */
class BrowserStorageHelper {
    get(key: BrowserStorageKey) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null; // 기존 생성한 프로토타입이 없는 object 생성자 객체 리턴
    }

    set(key: BrowserStorageKey, jsonObj: any) {
        localStorage.setItem(key, JSON.stringify(jsonObj));
    }

    remove(key: BrowserStorageKey) {
        localStorage.removeItem(key);
    }
}

export default new BrowserStorageHelper();
