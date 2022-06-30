import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RoleAttribute } from '@src/enum/role';
import Layout from '@src/component/layout/Layout';
import { MenuType } from '@src/enum/menuType';
import { AuthStorage } from '@src/data/browser-storage-impI/AuthStorage';

/**
 * 권한에 따라 라우팅 여부를 결정한다.
 * 스프링 시큐리티의 Auth Checking 기능과 유사하게 구현.
 * */

type AuthRouteProps = {
    exact: boolean;
    path: string;
    names: Array<string>;
    component: React.FC;
    roles: RoleAttribute[];
    type: MenuType;
};

function AuthRoute({ component: Component, roles: menuRoles, type, ...rest }: AuthRouteProps): JSX.Element {
    let redirectPath = '/common/page403'; // 권한 없음
    const myAuth = AuthStorage.get();
    const roleAttrs: Array<string> = myAuth ? myAuth.getRoleAttrs() : [RoleAttribute.ROLE_ANONYMOUS];
    const isAuth: boolean = menuRoles.some(menuRole => roleAttrs.includes(menuRole)); // 권한 체크

    // 인증 정보가 없으면 로그인 페이지로 이동
    if (!myAuth) {
        redirectPath = '/common/login';
    }

    // 로그인 이후 로그인 페이지로 가려는 경우
    else if (rest.path === '/common/login' && myAuth) {
        redirectPath = '/';
    }

    return (
        <Route
            {...rest}
            render={() => (
                <Layout type={type} path={rest.path} names={rest.names}>
                    {isAuth ? <Component /> : <Redirect to={redirectPath} />}
                </Layout>
            )}
        />
    );
}

export default AuthRoute;
