const initialState = {
    portfolio: null,
    user: null
};

const AppReducer = (state = initialState, action) => {
    switch(action.type) {
        case "TEST":
            console.log(action)
            return state;
        default:
            return state;
    }
}
export default AppReducer;