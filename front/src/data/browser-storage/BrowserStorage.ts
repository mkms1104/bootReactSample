import BrowserStorageKey from '@src/data/browser-storage/BrowserStorageKey';
import BrowserStorageMapper from '@src/data/browser-storage/BrowserStorageMapper';
import BrowserStorageHelper from '@src/data/browser-storage/BrowserStorageHelper';

/**
 * 해당 클래스를 통해 스토리지를 생성한다.
 * 객체를 저장할 경우에만 사용한다. (단순 문자열 저장은 기존 localStorage 사용)
 * */
export default class BrowserStorage<E> {
    private readonly key: BrowserStorageKey;
    private mapper: BrowserStorageMapper<E>;

    constructor(key: BrowserStorageKey, mapper: BrowserStorageMapper<E>) {
        this.key = key;
        this.mapper = mapper;
    }

    // 저장된 타입의 객체로 리턴한다.
    get(): E | null {
        const item = BrowserStorageHelper.get(this.key);
        return item ? this.mapper.fromJson(item) : null;
    }

    // 스토리지에 저장
    set(target: E): void {
        BrowserStorageHelper.set(this.key, this.mapper.toJson(target));
    }

    // 특정 프로퍼티 갱신
    update(updateObj: Partial<E>): void {
        const item = this.get();
        if (!item) throw new Error(`업데이트 대상 [${this.key}]이 스토리지에 존재하지 않습니다.`);
        BrowserStorageHelper.set(this.key, this.mapper.toJson(Object.assign(item, updateObj)));
    }

    // 삭제
    remove(): void {
        BrowserStorageHelper.remove(this.key);
    }
}
