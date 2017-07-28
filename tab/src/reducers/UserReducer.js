
import { LOAD_USER } from '../actions'

const initialState = {
	loggedInUser: null
};

const UserReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_USER:
			return { ...state, loggedInUser: action.user }
		default:
			return state;
	}
}
export default UserReducer;