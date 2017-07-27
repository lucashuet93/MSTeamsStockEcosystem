
import { LOAD_PORTFOLIO } from '../actions'

const initialState = {
    portfolio: null
};

const StocksReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_PORTFOLIO:
			return { ...state, portfolio: action.portfolio }
        default:
            return state;
    }
}
export default StocksReducer;