import { combineReducers } from 'redux';
import { loading } from './loading';

const rootReducer = combineReducers({
    loading,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
