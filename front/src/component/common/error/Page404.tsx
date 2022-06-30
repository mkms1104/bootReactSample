import React from 'react';

function Page404(): JSX.Element {
    function goHomeHandler() {
        location.href = '/'; // 원래는 react-router-dom 의 Link 컴포넌트로 처리해야 하나, css 디자인 때문에 이렇게 한다.
    }

    return (
        <div className="wrap wrap_error">
            <div className="container">
                <div className="inner_box">
                    <div className="wrap_box">
                        <div className="box_header">
                            <span className="ico" />
                        </div>
                        <div className="box_body">
                            <h2 className="tit_header">요청 하신 페이지를 찾을 수 없습니다.</h2>
                            <p className="txt_body_sub">관련 문의사항은 고객센터로 문의 바랍니다.</p>
                            <span className="txt_body_sub">
                                고객센터 : <a className="txt_link">1544-4155</a>
                            </span>
                        </div>
                        <div className="box_footer">
                            <button type="button" className="btn btn_normal xlarge" onClick={goHomeHandler}>
                                홈으로
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page404;
