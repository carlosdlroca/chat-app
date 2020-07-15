import { SET_CURRENT_USER } from "../actionTypes";
import api from "shared/utils/api";

export function setUser(user) {
    return { type: SET_CURRENT_USER, user };
}

export function logout() {
    localStorage.clear();
    return setUser({});
}

export async function authUser(authAction, userData) {
    try {
        const { token, ...user } = await api(
            "POST",
            `/api/auth/${authAction}`,
            userData
        );

        if (user.error) {
            return logout();
        }

        localStorage.setItem("jwtToken", token);
        return setUser(user);
    } catch (err) {
        return setUser({});
    }
}
