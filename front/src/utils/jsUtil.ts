/**
 * epe 공통 유틸 함수를 선언한다.
 * 주석 필수
 * */

const jsUtil = {
    // 값이 비어있는지 확인하다.
    isEmpty(value: any): boolean {
        if (value === null || value === undefined) return true;
        if (value instanceof Array && value.length === 0) return true;
        if (typeof value === 'string' && value.trim().length === 0) return true;
        if (typeof value === 'number' && value === 0) return true;
        if (typeof value === 'object' && Object.keys(value).length === 0) return true;
        return false;
    },
};

export default jsUtil;
