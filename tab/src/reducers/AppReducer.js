
import { LOAD_PORTFOLIO, LOAD_USER } from '../actions'

const initialState = {
    portfolio: null,
    user: null
};

const AppReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_PORTFOLIO:
            console.log(action)
            return state;
        case LOAD_USER:
            console.log(action)
            return state;
        default:
            return state;
    }
}
export default AppReducer;