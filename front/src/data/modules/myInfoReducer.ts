// action
const SET_MENU = 'header/SET_MENU' as const;
const TOGGLE_MENU = 'header/TOGGLE_MENU' as const;
const SET_MEMBER_ID = 'header/SET_MEMBER_ID' as const;
const SET_ROLE_GROUP_NAME = 'header/SET_ROLE_GROUP_NAME' as const;

// action creator
export const setMenu = (menuClass: string) => ({
    type: SET_MENU,
    menuClass,
});

export const toggleMenu = (menuToggle: boolean) => ({
    type: TOGGLE_MENU,
    menuToggle,
});

export const setMemberId = (memberId: string) => ({
    type: SET_MEMBER_ID,
    memberId,
});

export const setRoleGroupName = (roleGroupName: string) => ({
    type: SET_ROLE_GROUP_NAME,
    roleGroupName,
});

// state type
type State = {
    menuClass: string;
    menuToggle: boolean;
    memberId: string;
    roleGroupName: string;
};

// action type
type Action =
    | ReturnType<typeof setMenu>
    | ReturnType<typeof toggleMenu>
    | ReturnType<typeof setMemberId>
    | ReturnType<typeof setRoleGroupName>;

export const initialState: State = {
    menuClass: 'dropdown user user-menu',
    menuToggle: false,
    memberId: '',
    roleGroupName: '',
};

// reducer
export function headerReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'header/SET_MENU':
            return {
                ...state,
                menuClass: action.menuClass,
            };
        case 'header/TOGGLE_MENU':
            return {
                ...state,
                menuToggle: action.menuToggle,
            };
        case 'header/SET_MEMBER_ID':
            return {
                ...state,
                memberId: action.memberId,
            };
        case 'header/SET_ROLE_GROUP_NAME':
            return {
                ...state,
                roleGroupName: action.roleGroupName,
            };
        default:
            throw new Error('Unhandled action');
    }
}
