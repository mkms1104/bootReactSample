export class Auth {
    readonly _memberId: string;
    readonly _roleAttrs: Array<string>;
    readonly _roleGroupId: string;
    readonly _roleGroupName: string;
    readonly _accessToken: string;

    constructor(
        _memberId: string,
        _roleAttrs: Array<string>,
        _roleGroupId: string,
        _roleGroupName: string,
        _accessToken: string,
    ) {
        this._memberId = _memberId;
        this._roleAttrs = _roleAttrs;
        this._roleGroupId = _roleGroupId;
        this._roleGroupName = _roleGroupName;
        this._accessToken = `Bearer ${_accessToken.replace('Bearer', '')}`; // 혹시나 토큰에 Bearer 키워드 있으면 지운다.
    }

    addRoles(...roleAttrs: Array<string>) {
        this._roleAttrs.push(...roleAttrs); // 원본 배열 수정
        return this;
    }

    getMemberId() {
        return this._memberId;
    }
    getRoleAttrs() {
        return this._roleAttrs;
    }
    getRoleGroupId() {
        return this._roleGroupId;
    }
    getRoleGroupName() {
        return this._roleGroupName;
    }
    getAccessToken() {
        return this._accessToken;
    }
}
