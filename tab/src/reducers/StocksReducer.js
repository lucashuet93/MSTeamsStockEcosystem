
import { LOAD_PORTFOLIO } from '../actions'

const initialState = {
    portfolio: null
};

const StocksReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_PORTFOLIO:
            console.log(action)
            return state;
        default:
            return state;
    }
}
export default StocksReducer;