import React from "react";
import BaseNavbar from "./BaseNavbar";
import { NavLink } from "./Styles";

export default function Unathenticated() {
    return (
        <BaseNavbar>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/auth/signin'>Sign In</NavLink>
            <NavLink to='/auth/signup'>Sign Up</NavLink>
        </BaseNavbar>
    );
}
