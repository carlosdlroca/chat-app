import { SET_CURRENT_USER } from "../actionTypes";

const initialState = {
    user: {},
    isAuthenticated: false,
};

export default function currentUserReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                isAuthenticated: Object.keys(action.user).length > 0,
                user: action.user,
            };
        default:
            return state;
    }
}
