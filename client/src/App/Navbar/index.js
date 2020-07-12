import React from "react";
import { Link } from "react-router-dom";
import { StyledNavbar } from "./Styles";

export default function Navbar() {
    return (
        <StyledNavbar>
            <Link to='/'>Home</Link>
        </StyledNavbar>
    );
}
