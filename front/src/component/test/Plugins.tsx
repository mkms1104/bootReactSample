import React from 'react';

function Plugins() {
    const aStyle = {
        color: 'blue',
    };

    return (
        <section className="content">
            <div className="inner_content">
                <div className="wrap_section wrap_help">
                    <div className="box_header">
                        <div className="box_tit">
                            <h2 className="tit_sub">UI 플러그인 종류 및 특징</h2>
                        </div>
                    </div>
                    <ul className="box_body">
                        <li>
                            <h1>Grid</h1>
                            <h3># ag-grid</h3>
                            <h3>
                                <a
                                    href="https://www.ag-grid.com/react-grid/"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={aStyle}
                                >
                                    # 참고링크
                                </a>
                            </h3>
                        </li>
                        <br />
                        <li>
                            <h1>Chart</h1>
                            <h3># highChart</h3>
                        </li>
                        <br />
                        <li>
                            <h1>Modal(Dialog)</h1>
                            <h3># react-modal</h3>
                            <h3>
                                <a
                                    href="https://www.npmjs.com/package/react-modal"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={aStyle}
                                >
                                    # 참고링크
                                </a>
                            </h3>
                        </li>
                        <br />
                        <li>
                            <h1>Select</h1>
                            <h3># react-select</h3>
                            <h3>
                                <a href="https://react-select.com/home" target="_blank" rel="noreferrer" style={aStyle}>
                                    # 참고링크
                                </a>
                            </h3>
                        </li>
                        <br />
                        <li>
                            <h1>Datepicker</h1>
                        </li>
                        <br />
                        <li>
                            <h1>Alert</h1>
                            <h3># react-alert</h3>
                            <h3>
                                <a
                                    href="https://www.npmjs.com/package/react-alert"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={aStyle}
                                >
                                    # 참고링크
                                </a>
                            </h3>
                        </li>
                        <br />
                        <li>
                            <h1>Tooltip</h1>
                            <h3># react-tooltip</h3>
                            <h3>
                                <a
                                    href="https://www.npmjs.com/package/react-tooltip"
                                    target="_blank"
                                    rel="noreferrer"
                                    style={aStyle}
                                >
                                    # 참고링크
                                </a>
                            </h3>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}

export default Plugins;
