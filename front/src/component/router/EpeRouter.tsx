import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthRoute from './AuthRoute';
import menuList from '@src/menu/menuList';
import { Menu } from '@src/menu';

/**
 * menuList 정보를 기준으로 프로젝트 라우팅을 설정한다.
 * 실제 화면 상에 그리는 것이 아닌 매핑 단계이다.
 * */
function EpeRouter(): JSX.Element {
    return (
        <Switch>
            {menuList.map(menu => {
                const authRoutes: Array<JSX.Element> = [];
                const allMenus = Menu.getAllChildMenus(menu);
                const lowDepthMenus = allMenus.filter(v => {
                    return v.getChild().length === 0;
                });

                // 최하위 depth 메뉴를 기준으로 라우팅을 연결한다.
                lowDepthMenus.forEach(v => {
                    const { component } = v;
                    const path = Menu.getAllPath(v);
                    const names = Menu.getAllName(v);
                    authRoutes.push(
                        <AuthRoute
                            exact
                            key={path}
                            path={path}
                            names={names}
                            component={component as React.FC}
                            roles={v.getRole()}
                            type={v.getMenuType()}
                        />,
                    );
                });
                return authRoutes;
            })}
            <Route
                render={() => {
                    // 경로 변경을 위해 render 사용해서 리다이렉트 한다.
                    return <Redirect to="/common/page404"></Redirect>;
                }}
            />
        </Switch>
    );
}

export default EpeRouter;
