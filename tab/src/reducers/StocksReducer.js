
import { LOAD_PORTFOLIO, UPDATE_STATISTICS, DELETE_STOCK, ADD_STOCK, UPDATE_STOCK } from '../actions'

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
        case DELETE_STOCK:
			// return { ...state, statistics: action.statistics }
            return state;
        case ADD_STOCK:
			return { ...state, portfolio: [...state.portfolio, action.stock] }
        case UPDATE_STOCK:
			// return { ...state, statistics: action.statistics }
            return state
        default:
            return state;
    }
}
export default StocksReducer;