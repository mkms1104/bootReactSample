import React, { useEffect, useReducer } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
    headerReducer,
    initialState,
    setMenu,
    toggleMenu,
    setMemberId,
    setRoleGroupName,
} from '@src/data/modules/myInfoReducer';
import { logout } from '@src/api/loginApi';
import { AuthStorage } from '@src/data/browser-storage-impI/AuthStorage';

export default function Header() {
    console.log('%c render Header', 'color: #ff0000');

    const history = useHistory();
    const [state, dispatch] = useReducer(headerReducer, initialState);
    function dropDownHandler() {
        dispatch(setMenu(`dropdown user user-menu ${state.menuToggle ? '' : 'open'}`));
        dispatch(toggleMenu(!state.menuToggle));
    }

    async function logoutHandler() {
        await logout(); // 응답 결과가 없다...
        AuthStorage.remove();
        history.push('/common/login');
    }

    useEffect(() => {
        const myAuth = AuthStorage.get();
        if (myAuth) {
            dispatch(setMemberId(myAuth.getMemberId()));
            dispatch(setRoleGroupName(myAuth.getRoleGroupName()));
        }
    }, []);

    return (
        <>
            <header className="main-header">
                <div className="logo">
                    <Link to="/" className="logo-mini">
                        인터파크
                    </Link>
                    <Link to="/" className="logo-lg">
                        인터파크
                    </Link>
                </div>

                <nav className="navbar navbar-static-top">
                    {AuthStorage.get() && (
                        <div className="navbar-custom-menu">
                            <ul className="nav navbar-nav">
                                <li className={state.menuClass} onClick={dropDownHandler}>
                                    <a
                                        className="dropdown-toggle"
                                        data-toggle="dropdown"
                                        aria-expanded={state.menuToggle}
                                    >
                                        <span className="txt_body">{state.memberId}</span>
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li className="user-header">
                                            <span className="txt_body">{state.memberId}</span>
                                            <span className="txt_body_sub">{state.roleGroupName}님</span>
                                        </li>

                                        <li className="user-footer">
                                            <ul className="user-footer-menu">
                                                <li>
                                                    <a id="myInfoLinkTxt">내 정보</a>
                                                </li>
                                                <li>
                                                    <a onClick={logoutHandler}>로그아웃</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    )}
                </nav>
            </header>
        </>
    );
}
