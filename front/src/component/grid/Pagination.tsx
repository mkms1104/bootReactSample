import React, { useEffect, useState } from 'react';
import { Api } from 'ag-grid-community';

/**
 * 공통 페이지네이션 컴포넌트
 * https://www.ag-grid.com/javascript-grid-pagination/
 * */

export default function Pagination({ api }: Api): JSX.Element | null {
    if (!api) return null; // agGrid 초기화 이전에 접근할 경우
    console.log('%c render Pagination', 'color: #ff0000');

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(10);

    const [isNext, setIsNext] = useState<boolean>(false);
    const [isPrev, setIsPrev] = useState<boolean>(true);

    const totalRowCount: number = api.paginationGetRowCount(); // 전체 행 수 (고정 값)

    // 버튼 disabled 처리
    useEffect(() => {
        setIsPrev(currentPage === 1 ? false : true);
        setIsNext(lastPage === totalRowCount ? true : false);
    }, [currentPage, lastPage]);

    // 첫 페이지로 이동
    const onBtnFirst = (): void => {
        api.paginationGoToFirstPage();
        setCurrentPage(api.paginationGetCurrentPage() * api.paginationGetPageSize() + 1);
        setLastPage(api.paginationGetPageSize());
    };

    // 마지막 페이지로 이동
    const onBtnLast = (): void => {
        api.paginationGoToLastPage();
        setCurrentPage(api.paginationGetCurrentPage() * api.paginationGetPageSize() + 1);
        setLastPage(api.paginationGetRowCount());
    };

    // 이전 페이지로 이동
    const onBtnPrev = (): void => {
        api.paginationGoToPreviousPage();
        setCurrentPage(api.paginationGetCurrentPage() * api.paginationGetPageSize() + 1);
        setLastPage((api.paginationGetCurrentPage() + 1) * api.paginationGetPageSize());
    };

    // 다음 페이지로 이동
    const onBtnNext = (): void => {
        api.paginationGoToNextPage();
        setCurrentPage(api.paginationGetCurrentPage() * api.paginationGetPageSize() + 1);
        const lastPage = (api.paginationGetCurrentPage() + 1) * api.paginationGetPageSize();
        const rowCount = api.paginationGetRowCount();
        setLastPage(lastPage < rowCount ? lastPage : rowCount);
    };

    // 한 페이지에 보여질 사이즈 변경
    const onPageSizeChanged = (value: string): void => {
        api.paginationSetPageSize(Number(value));
        api.paginationGoToPage(0); // 첫번째 페이지로 이동

        setCurrentPage(1); // 1페이지 텍스트 표시
        setLastPage(Number(value) < api.paginationGetRowCount() ? Number(value) : api.paginationGetRowCount()); // 최대 사이즈까지 표시
    };

    return (
        <>
            <div className="clearfix">
                <div className="fl">
                    {/*<Select width={150} options={pageSizeOptions} onChange={onPageSizeChanged} />*/}
                </div>
                <div className="fr">
                    <div className="page_navigation">
                        <button type="button" className="btn btn_prev_first" onClick={onBtnFirst} disabled={isPrev}>
                            FIRST
                        </button>
                        <button type="button" className="btn btn_prev" onClick={onBtnPrev} disabled={isPrev}>
                            PREV
                        </button>
                        <div className="pagenation">
                            <span className="txt_body">
                                {currentPage} - {lastPage} / {totalRowCount}
                            </span>
                        </div>
                        <button type="button" className="btn btn_next" onClick={onBtnNext} disabled={isNext}>
                            NEXT
                        </button>
                        <button type="button" className="btn btn_next_last" onClick={onBtnLast} disabled={isNext}>
                            LAST
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

const pageSizeOptions = [
    { value: '10', label: '10' },
    { value: '20', label: '20' },
    { value: '50', label: '50' },
    { value: '100', label: '100' },
    { value: '200', label: '200' },
];
