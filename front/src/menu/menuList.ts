import menuStatic from './menuStatic';
import {Menu} from './index';
import {RoleAttribute} from '@src/enum/role';
import AdvMng01 from '@src/component/operMng/advMng/advMng01';
import AdvMng02 from '@src/component/operMng/advMng/advMng02';
import AgencyMng01 from '@src/component/operMng/agencyMng/agencyMng01';
import AgencyMng02 from '@src/component/operMng/agencyMng/agencyMng02';
import BoardMng01 from '@src/component/boardMng/BoardMng01';
import BoardMng02 from '@src/component/boardMng/BoardMng02';
import BoardMng03 from '@src/component/boardMng/BoardMng03';
import BoardMng04 from '@src/component/boardMng/BoardMng04';
import Plugins from '@src/component/test/Plugins';

/**
 * 화면 상에 보여질 메뉴를 선언한다.
 * 기존 프로젝트에서 선언하는 방식과 유사하게 구현하였다.
 * 경로 상에 컴포넌트 파일이 존재하지 않아도 에러를 발생시키지 않는다. (유지보수를 위해 경로에 맞게 폴더링하는 것을 추천)
 * 해당 파일에서는 eslint 와 prettier 의 규칙이 오히려 가독성을 떨어뜨리므로 비활성화 후 작성한다.
 * */

const menuList: Array<Menu> = [menuStatic.HOME, menuStatic.COMMON];

/* eslint-disable */
// prettier-ignore
menuList.push(
    new Menu('/operMng', '운영 관리', null,
        new Menu('/advMng', '광고주 관리', null,
            new Menu('/advMng01', '광고주 속성 관리', AdvMng01, RoleAttribute.ROLE_LOGIN),
            new Menu('/advMng02', '광고주 리스트', AdvMng02, RoleAttribute.ROLE_LOGIN)),
        new Menu('/agencyMng', '대행사 관리', null,
            new Menu('/agencyMng01', '대행사 담당자 관리', AgencyMng01, RoleAttribute.ROLE_LOGIN),
            new Menu('/agencyMng02', '대행사 정산', AgencyMng02, RoleAttribute.ROLE_USER_DEV)),
    )
);

// prettier-ignore
menuList.push(
    new Menu('/boardMng', '게시판 관리', null,
        new Menu('/boardMng01', 'FAQ 관리', BoardMng01, RoleAttribute.ROLE_LOGIN),
        new Menu('/boardMng02', '공지사항 관리', BoardMng02, RoleAttribute.ROLE_LOGIN),
        new Menu('/boardMng03', '배너 관리', BoardMng03, RoleAttribute.ROLE_LOGIN),
        new Menu('/boardMng04', '메뉴별 안내문', BoardMng04, RoleAttribute.ROLE_LOGIN)
    )
);

// prettier-ignore
menuList.push(
    new Menu('/test', '테스트', null,
        new Menu('/pluginList', '플러그인', Plugins, RoleAttribute.ROLE_ANONYMOUS),
        new Menu('/pluginSample', '플러그인 샘플', Plugins, RoleAttribute.ROLE_ANONYMOUS)
    )
);

/* eslint-enable */

export default menuList;
