import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { MenuType } from '../../enum/menuType';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

/**
 * 기존 tiles 기능을 유사하게 흉내냈다.
 * 메뉴 타입 미지정 시 기본 NORMAL
 * */

type LayoutProps = {
    path: string;
    names: Array<string>;
    type: MenuType;
    children: ReactNode;
};

function Layout({ path, names, type, children }: LayoutProps): JSX.Element {
    switch (type) {
        case MenuType.NORMAL:
            return (
                <div className="wrapper" style={{ height: 'auto', minHeight: '100%' }}>
                    <Header />
                    <Sidebar />
                    <div className="content-wrapper">
                        {path !== '/' && (
                            <div className="content-header">
                                <ol className="breadcrumb">
                                    <li>
                                        <Link to="/">
                                            <i className="ico_home"></i>
                                        </Link>
                                    </li>
                                    {names.map((name, index) => {
                                        return (
                                            <li key={index}>
                                                <a>{name}</a>
                                            </li>
                                        );
                                    })}
                                </ol>
                                <h1 className="tit_header">{names[names.length - 1]}</h1>
                            </div>
                        )}
                        <div className="content">{children}</div>
                    </div>
                    <Footer />
                </div>
            );

        case MenuType.LOGIN:
            return <div className="wrap wrap_login">{children}</div>;

        case MenuType.ERROR:
            return (
                <div className="wrapper wrapper_error">
                    <Header />
                    <div className="content-wrapper">{children}</div>
                </div>
            );

        default:
            throw new Error('unhandled menuType');
    }
}

Layout.defaultProps = {
    type: MenuType.NORMAL,
};

export default Layout;
