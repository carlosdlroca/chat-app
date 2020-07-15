import React, { createContext, useReducer } from "react";
import { SET_CURRENT_USER } from "./actionTypes";

const initialState = {
    isAuthenticated: false,
    user: null,
};

function reducer(state = initialState, action) {
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

export const StoreContext = createContext({});

export default function StoreProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StoreContext.Provider value={[state, dispatch]}>
            {children}
        </StoreContext.Provider>
    );
}
