import { Menu } from './index';
import { RoleAttribute } from '@src/enum/role';
import { MenuType } from '@src/enum/menuType';
import Page403 from '@src/component/common/error/Page403';
import Page404 from '@src/component/common/error/Page404';
import Home from '@src/component/Home';
import Login from '@src/component/common/login/Login';

/**
 * 화면 상에 보여지는 메뉴가 아닌 공통 메뉴를 선언한다.
 * common/xxx 경로로 접근할 수 있다.
 * */

/* eslint-disable */

// prettier-ignore
const HOME = new Menu('/', '홈', Home, RoleAttribute.ROLE_LOGIN);
// prettier-ignore
const LOGIN = new Menu('/login', '로그인', Login, RoleAttribute.ROLE_ANONYMOUS).setMenuType(MenuType.LOGIN);
// prettier-ignore
const PAGE403 = new Menu('/page403', '권한부족', Page403, RoleAttribute.ROLE_LOGIN, RoleAttribute.ROLE_ANONYMOUS).setMenuType(MenuType.ERROR);
// prettier-ignore
const PAGE404 = new Menu('/page404', '잘못된경로', Page404, RoleAttribute.ROLE_LOGIN, RoleAttribute.ROLE_ANONYMOUS).setMenuType(MenuType.ERROR);
// prettier-ignore
const COMMON = new Menu('/common', '공통', null, LOGIN, PAGE403, PAGE404);

/* eslint-enable */
const menuStatic = {
    HOME,
    COMMON,
};

export default menuStatic;
