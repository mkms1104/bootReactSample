import { sendApi } from '@src/utils/axiosUtil';

export const login = (memberId: string, pwd: string) => {
    return sendApi.get('common/login', { memberId, pwd });
};
export const logout = () => {
    sendApi.get('common/logout', null);
};
