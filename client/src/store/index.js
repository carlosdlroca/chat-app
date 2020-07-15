import React, { createContext, useReducer, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { SET_CURRENT_USER } from "./actionTypes";
import { setUser } from "./actions/auth";

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

    useEffect(() => {
        if (localStorage.jwtToken) {
            try {
                dispatch(setUser(jwtDecode(localStorage.jwtToken)));
            } catch (e) {
                dispatch(setUser({}));
            }
        }
    }, []);
    return (
        <StoreContext.Provider value={[state, dispatch]}>
            {children}
        </StoreContext.Provider>
    );
}
