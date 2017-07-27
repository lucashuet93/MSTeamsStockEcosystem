import { combineReducers, Reducer } from 'redux';
import UserReducer from './UserReducer';
import StocksReducer from './StocksReducer';

const rootReducer = combineReducers({
    user: UserReducer,
    stocks: StocksReducer
});

export default rootReducer;