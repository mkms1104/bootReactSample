/**
 * 구현체를 위한 공통 인터페이스
 * */
export default interface BrowserStorageMapper<E> {
    fromJson(json: any): E; // ex) return Object.setPrototypeOf(json, Auth.prototype)
    toJson(target: E): any; // ex) return target
}
