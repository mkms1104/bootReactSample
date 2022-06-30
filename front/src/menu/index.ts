import React from 'react';
import { RoleAttribute } from '../enum/role';
import { MenuType } from '../enum/menuType';

/**
 * 메뉴 구조 클래스를 선언한다.
 * RootMenu 에 공통 static 메서드를 모아놓았다.
 * */

abstract class RootMenu {
    readonly path: string;
    readonly name: string;

    protected constructor(path: string, name: string) {
        this.path = path;
        this.name = name;
    }

    /* 인자로 받은 메뉴 포함 모든 하위 메뉴를 리턴한다. */
    static getAllChildMenus(menu: Menu): Array<Menu> {
        const queue: Array<Menu> = [];
        const result: Array<Menu> = [];

        queue.push(menu);
        while (queue.length !== 0) {
            const node = queue.shift();
            if (node) {
                result.push(node);
                const child = node.getChild();
                queue.push(...child);
            }
        }
        return result;
    }

    /* 인자로 받은 메뉴 포함 모든 경로를 리턴한다. */
    static getAllPath(menu: Menu): string {
        const result: Array<string> = [menu.path];
        let current = menu;
        while (current.getParent().length !== 0) {
            current = current.getParent()[0];
            result.push(current.path);
        }
        return result.reverse().join('');
    }

    /* 인자로 받은 메뉴 포함 모든 경로를 리턴한다. */
    static getAllName(menu: Menu): Array<string> {
        const result: Array<string> = [menu.name];
        let current = menu;
        while (current.getParent().length !== 0) {
            current = current.getParent()[0];
            result.push(current.name);
        }
        return result.reverse();
    }
}

export class Menu extends RootMenu {
    readonly component: React.FC | null; // 렌딩 컴포넌트
    private _restArgs?: Array<Menu | RoleAttribute>; // 권한 or 자식 메뉴 오버로딩 전용 필드
    private _type: MenuType = MenuType.NORMAL; // 메뉴 타입
    private _parent: Array<Menu> = []; // 부모 메뉴
    private _child: Array<Menu> = []; // 자식 메뉴
    private _role: Array<RoleAttribute> = []; // 권한

    constructor(path: string, name: string, component: React.FC<any> | null, ...restArgs: Array<Menu | RoleAttribute>) {
        super(path, name);
        this.component = component;
        this._restArgs = restArgs;

        if (restArgs.length === 0) {
            throw new Error(
                `[ path: ${this.path}, name: ${this.name} ] => 하위 메뉴 또는 권한 인자가 입력되지 않았습니다.`,
            );
        }

        restArgs.map(arr => {
            if (arr instanceof Menu) {
                arr._parent.push(this);
                this._child.push(arr);
            } else {
                this._role.push(arr);
            }
        });

        delete this._restArgs; // 오버로딩 필드 삭제
    }

    setMenuType(type: MenuType): this {
        this._type = type;
        return this; // 체이닝
    }

    getMenuType() {
        return this._type;
    }

    getParent() {
        return this._parent;
    }

    getChild() {
        return this._child;
    }

    getRole() {
        return this._role;
    }
}
