
import { LOAD_PORTFOLIO, UPDATE_STATISTICS } from '../actions'

const initialState = {
    portfolio: null,
    statistics: null
};

const StocksReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_PORTFOLIO:
			return { ...state, portfolio: action.portfolio }
        case UPDATE_STATISTICS:
			return { ...state, statistics: action.statistics }
        default:
            return state;
    }
}
export default StocksReducer;