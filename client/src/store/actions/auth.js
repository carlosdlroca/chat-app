import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";
import api from "shared/utils/api";
import history from "shared/history";

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user,
    };
}

export function logout() {
    return (dispatch) => {
        localStorage.clear();
        dispatch(setCurrentUser({}));
        history.push("/");
    };
}

export function authUser(authAction, userData) {
    return async (dispatch) => {
        try {
            const { token, ...user } = await api(
                "POST",
                `/api/auth/${authAction}`,
                userData
            );

            if (user.error) {
                dispatch(addError(user.error.message));
                return;
            }
            localStorage.setItem("jwtToken", token);
            dispatch(setCurrentUser(user));
            history.push("/");
        } catch (err) {
            dispatch(addError("Something went wrong"));
            history.push(`/auth/${authAction}`);
        }
    };
}
