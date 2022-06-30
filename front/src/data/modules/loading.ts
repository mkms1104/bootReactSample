// action
const ON = 'loading/ON' as const;
const OFF = 'loading/OFF' as const;

// action creator
export const on = () => ({
    type: ON,
});

export const off = () => ({
    type: OFF,
});

// action type
type LoadingAction = ReturnType<typeof on> | ReturnType<typeof off>;

// state type
type LoadingState = {
    isLoading: boolean;
};

// initial state
const initialState: LoadingState = {
    isLoading: false,
};

// reducer
export function loading(state: LoadingState = initialState, action: LoadingAction) {
    switch (action.type) {
        case 'loading/ON':
            return { isLoading: true };
        case 'loading/OFF':
            return { isLoading: false };
        default:
            return state;
    }
}
