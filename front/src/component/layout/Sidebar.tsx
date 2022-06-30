import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import menuList from '@src/menu/menuList';
import { Menu } from '@src/menu';

/**
 * menuList 파일에 등록된 메뉴를 기준으로 화면을 그린다.
 * 우선 3depth 까지 그릴 수 있도록 구현했다.
 * */
function Sidebar() {
    console.log('%c render Sidebar', 'color: #ff0000');

    const [depth01, setDepth01] = useState(new Array(menuList.length).fill('wrap_depth1 treeview')); // useState 내에 불변 배열 하나로 모든 메뉴를 처리한다.
    function depth01Handler(index: number) {
        return function () {
            const menuClasses: Array<string> = [...depth01];
            const isActive = menuClasses[index].includes('active');

            const prevActiveMenuIndex = menuClasses.findIndex(v => v.includes('active'));
            if (prevActiveMenuIndex !== -1) menuClasses[prevActiveMenuIndex] = 'wrap_depth1 treeview'; // 이전 활성화된 메뉴 닫기

            menuClasses[index] = `wrap_depth1 treeview ${isActive ? '' : 'active'}`;
            setDepth01(menuClasses);
        };
    }

    return (
        <aside className="main-sidebar">
            <section className="sidebar">
                <ul className="sidebar-menu tree" data-widget="tree">
                    {menuList.map((v, i) => {
                        if (v.path === '/' || v.path.startsWith('/common')) return null; // 특정 경로는 그리지 않는다.
                        return (
                            <li key={v.path} className={depth01[i]}>
                                {v.getChild().length !== 0 ? (
                                    <a onClick={depth01Handler(i)}>
                                        <i className="ico_depth1 ico_depth1_01"></i>
                                        <span>{v.name}</span>
                                        <span className="area_arrow">
                                            <i className="ico_caret"></i>
                                        </span>
                                    </a>
                                ) : (
                                    <Link to={v.path}>
                                        <i className="ico_depth1 ico_depth1_01"></i>
                                        <span>{v.name}</span>
                                    </Link>
                                )}

                                <ul className="treeview-menu wrap_depth2">
                                    {v.getChild().map(v => {
                                        const path = Menu.getAllPath(v);
                                        return (
                                            <li key={path}>
                                                {v.getChild().length !== 0 ? (
                                                    <a>
                                                        <span>{v.name}</span>
                                                        <span className="area_arrow">
                                                            <i className="ico_caret"></i>
                                                        </span>
                                                    </a>
                                                ) : (
                                                    <Link to={path}>
                                                        <span>{v.name}</span>
                                                    </Link>
                                                )}
                                                <ul className="wrap_depth3">
                                                    {v.getChild().map(v => {
                                                        const path = Menu.getAllPath(v);
                                                        return (
                                                            <li key={path}>
                                                                <Link to={path}>
                                                                    <span>{v.name}</span>
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </aside>
    );
}

export default Sidebar;
