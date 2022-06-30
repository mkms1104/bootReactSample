import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RoleAttribute } from '@src/enum/role';
import { login } from '@src/api/loginApi';
import { AuthStorage } from '@src/data/browser-storage-impI/AuthStorage';
import { Auth } from '@src/auth/Auth';

function Login(): JSX.Element {
    const history = useHistory();
    const idRef = useRef<HTMLInputElement>(null);
    const [memberId, setMemberId] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');

    async function loginHandler() {
        const response = await login(memberId, pwd);
        const { data, status, message } = response.data;
        if (status !== 'OK') {
            alert(message);
            return false;
        }
        console.log(response);

        // 로그인 성공
        const { accessToken, auth } = data;
        const { roleGroupId, roleGroupName, roleAttrs } = auth.roleGroup;
        const myAuth = new Auth(
            auth.memberId,
            // roleAttrs.map((v: any) => v.attribute),
            roleAttrs,
            roleGroupId,
            roleGroupName,
            accessToken,
        ).addRoles(RoleAttribute.ROLE_LOGIN); // 로그인 성공 시 로그인 권한 부여

        AuthStorage.set(myAuth); // 인증 정보 저장
        history.push('/'); // 메인 페이지로 이동
    }

    function localLoginHandler() {
        const myAuth = new Auth("123", Array("1"), "", "", "").addRoles(RoleAttribute.ROLE_LOGIN);
        AuthStorage.set(myAuth); // 인증 정보 저장
        history.push('/'); // 메인 페이지로 이동
    }

    useEffect(() => {
        idRef.current?.focus();
    }, []);

    return (
        <div className="container">
            <div className="inner_box inner_box_01">
                <div className="wrap_box">
                    <div className="box_header">
                        <h1 className="tit_header">INTERPARK</h1>
                        <h2 className="txt_sub_desc">
                            SELLER AD <br />
                            CENTER <br />
                            <strong> LOGIN </strong>
                        </h2>
                    </div>
                    <div className="box_footer">
                        <p className="copyright">Copyright © INTERPARK ALL Rights Reserved.</p>
                    </div>
                </div>
            </div>
            <div className="inner_box inner_box_02">
                <div className="wrap_box">
                    <div className="box_header">
                        <h3 className="txt_sub_desc">INTERPARK</h3>
                    </div>
                    <div className="box_body">
                        <div className="box_tf">
                            <form id="loginForm">
                                <input
                                    type="text"
                                    name="memberId"
                                    className="tf_comm xlarge expand"
                                    placeholder="아이디 입력"
                                    autoComplete="username"
                                    value={memberId}
                                    onChange={e => setMemberId(e.target.value)}
                                    ref={idRef}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    className="tf_comm xlarge expand"
                                    placeholder="비밀번호 입력"
                                    autoComplete="current-password"
                                    value={pwd}
                                    onChange={e => setPwd(e.target.value)}
                                />
                            </form>
                            <div className="box_checkbox">
                                <input type="checkbox" className="inp_check" id="id_save" />
                                <label htmlFor="id_save">아이디 저장</label>
                            </div>
                        </div>
                    </div>
                    <div className="box_footer">
                        <button type="button" className="btn btn_normal xlarge expand" onClick={loginHandler}>
                            로그인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
