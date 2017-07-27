
import { LOAD_USER } from '../actions'

const initialState = {
	user: null
};

const UserReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_USER:
			return { ...state, user: action.user }
		default:
			return state;
	}
}
export default UserReducer;