import React from "react";
import BaseNavbar from "./BaseNavbar";
import { NavLink } from "./Styles";

export default function AuthenticatedNav({ username, id, logout }) {
    return (
        <BaseNavbar>
            <NavLink to='/'>Home</NavLink>
            <NavLink to={`/profiles/${id}`}>{username}</NavLink>
            <NavLink to='/chatrooms'>Chatrooms</NavLink>
            <NavLink as='span' onClick={() => logout()}>
                Logout
            </NavLink>
        </BaseNavbar>
    );
}
