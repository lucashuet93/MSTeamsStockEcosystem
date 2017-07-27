
import { LOAD_USER } from '../actions'

const initialState = {
    user: null
};

const UserReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_USER:
            console.log(action)
            return state;
        default:
            return state;
    }
}
export default UserReducer;