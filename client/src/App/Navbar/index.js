import React from "react";
import { Link } from "react-router-dom";
import { StyledNavbar } from "./Styles";

export default function Navbar() {
    return (
        <StyledNavbar>
            <Link to='/'>Home</Link>
            <Link to='/auth/signin'>Sign in</Link>
            <Link to='/auth/signup'>Sign up</Link>
        </StyledNavbar>
    );
}
