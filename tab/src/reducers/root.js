import { combineReducers, Reducer } from 'redux';
import AppReducer from './AppReducer';

const rootReducer = combineReducers({
    app: AppReducer,
});

export default rootReducer;