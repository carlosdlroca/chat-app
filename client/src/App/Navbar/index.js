import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StyledNavbar } from "./Styles";
import { StoreContext } from "store/";
import { setUser } from "store/actions/auth";

export default function Navbar() {
    const [{ isAuthenticated, user }, dispatch] = useContext(StoreContext);
    return (
        <StyledNavbar>
            <Link to='/'>Home</Link>
            {isAuthenticated ? (
                <>
                    <span>Welcome, {user.username}</span>
                    <span onClick={() => dispatch(setUser({}))}>Logout</span>
                </>
            ) : (
                <>
                    <Link to='/auth/signin'>Sign in</Link>
                    <Link to='/auth/signup'>Sign up</Link>
                </>
            )}
        </StyledNavbar>
    );
}
