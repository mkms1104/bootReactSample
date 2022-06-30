import moment from 'moment';
import jsUtil from './jsUtil';
import { ValueFormatterParams } from 'ag-grid-community';

/**
 * 공통 그리드 formatter를 설정한다.
 * https://www.ag-grid.com/javascript-grid-value-formatters/
 * https://www.ag-grid.com/javascript-grid-cell-rendering-components/
 */
const fmUtil = {
    /**
     * 마지막 텍스트 formatter
     * 결과 텍스트 마지막에 원하는 텍스트를 붙인다.
     * 결과 텍스트가 없을 경우 기본 '-' 표시한다.
     */
    lastTextFormatter(lastText = '', emptyText = '-') {
        return (props: ValueFormatterParams) => {
            if (jsUtil.isEmpty(props.value)) return emptyText;
            return formatNumber(props.value) + lastText;
        };
    },

    /**
     * 날짜 formatter
     * 기본 형식 YY.MM.DD
     */
    dateFormatter(format = 'YY.MM.DD') {
        return (props: ValueFormatterParams) => {
            return moment(props.value).format(format);
        };
    },

    /**
     * 버튼 renderer
     * 실제 버튼에 부착되는 이벤트가 아닌 바로 위 부모 태그에 붙인다. (이벤트 위임)
     * 실행 시점이 실제 버튼 노드 생성 이전이므로 실제 버튼에 붙이려면 번거로워진다.
     * 기존에 eu.cellDefaultCallback(id) 사용해서 처리했던 부분을 대체한다.
     */
    btnRenderer(btnText: any, onClickHandler: any) {
        return (props: any) => {
            props.eParentOfValue.addEventListener('click', () => {
                return onClickHandler(props.data, props.rowIndex); // 필요한 리턴 값 추가
            });
            // return jsUtil.buildHtml('button', { class: 'btn btn_light xxsmall' }, btnText);
        };
    },

    /**
     * 맵을 받아서 해당 키 값에 맞는 값을 리턴한다.
     * 맵 양식
     * const devMap = new Map([["DEV", "개발자"],["MASTER", "대표"]]);
     */
    keyValueFormatter(map: any) {
        return (props: any) => {
            if (jsUtil.isEmpty(props.value)) return '-';
            else return map.get(props.value);
        };
    },
};

/** 3자리 콤마, 소수점 버림 */
function formatNumber(number: number) {
    return Math.floor(number)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export { fmUtil };
