
import { LOAD_USER, UPDATE_USER_CAPITAL } from '../actions'

const initialState = {
	loggedInUser: null
};

const UserReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_USER:
			return { ...state, loggedInUser: action.user }
		case UPDATE_USER_CAPITAL:
			return { ...state, loggedInUser: {...state.loggedInUser, CapitalRemaining: action.capital} }
		default:
			return state;
	}
}
export default UserReducer;