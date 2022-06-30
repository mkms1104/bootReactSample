import React, { useEffect, useState } from 'react';
import { AgGrid } from '@src/component/grid/AgGrid';
import { fmUtil } from '@src/utils/gridFmUtil';
import moment from 'moment';
import { CreateColumnDefs } from '@src/component/grid/createColumnDefs';
import Pagination from '@src/component/grid/Pagination';
import useGrid from '@src/hook/useGrid';
import { addGridEvent } from '@src/component/grid/addEventListener';
import useAxios from '@src/hook/useAxios';

function AgencyMng01() {
    console.log('%c render agencyMng01', 'color: #ff0000');
    const { api, columnApi, setGridReady } = useGrid();
    const { get: sendApi } = useAxios();

    // grid event 전용 훅으로 따로 만들 것!
    useEffect(() => {
        addGridEvent(api, 'rowClicked', () => {
            console.log('rowClicked');
        });
    }, [api]);

    useEffect(() => {
        sendApi('member/findAll', null).then(res => {
            // console.log(res);
        });
    }, []);

    return (
        <div className="inner_content">
            <div className="wrap_section wrap_datagrid">
                <div className="box_header clearfix">
                    <div className="box_tit">
                        <h2 className="tit_sub">광고주 리스트</h2>
                    </div>
                    <div className="box_option">
                        <button type="button" className="btn btn_light small">
                            리스트 다운로드
                        </button>
                    </div>
                </div>
                <div className="box_body">
                    <AgGrid
                        columnDefs={columnDefs}
                        rowData={rowData}
                        setGridReady={setGridReady}
                        isCheckbox
                        pagination
                    />
                </div>
                <div className="box_footer clearfix">
                    <Pagination api={api} />
                </div>
            </div>
        </div>
    );
}

const columnDefs = CreateColumnDefs.concat(
    new CreateColumnDefs('대행사명', 'agencyName').addOptions({
        type: ['useEditableColumn'],
        tooltipField: 'agencyDiv',
        tooltipComponentParams: { color: '#ececec' },
    }),
    new CreateColumnDefs('사업자등록번호', 'comno'),
    new CreateColumnDefs('업태', 'a'),
    new CreateColumnDefs('업종', 'b'),
    new CreateColumnDefs('대표자명', 'pericName'),
    new CreateColumnDefs('등록일', 'basicDate').addOptions({
        valueFormatter: fmUtil.dateFormatter('YYYY.MM.DD hh:mm'),
    }),
    new CreateColumnDefs('담당자 수', 'pericCnt').addOptions({
        type: 'rightAligned',
    }),
    new CreateColumnDefs('담당 광고주 수', 'pericAdvCnt'),
    new CreateColumnDefs('담당자 관리', 'pericMng'),
);

const rowData = [
    {
        agencyName: '커넥트온',
        agencyDiv: '공식 대행사',
        comno: 6848700565,
        a: '서비스',
        b: '광고대행',
        pericName: '이우동',
        basicDate: moment(),
        pericCnt: 6,
        pericAdvCnt: 8,
    },
    {
        agencyName: '커넥트온',
        agencyDiv: '공식 대행사',
        comno: 6848700565,
        a: '서비스',
        b: '광고대행',
        pericName: '이우동',
        basicDate: moment(),
        pericCnt: 6,
        pericAdvCnt: 8,
    },
];

export default AgencyMng01;
