import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StyledNavbar, NavLinks, NavLink, NavItem } from "./Styles";
import { StoreContext } from "store/";
import { logout } from "store/actions/auth";

export default function Navbar() {
    const [{ isAuthenticated, user }, dispatch] = useContext(StoreContext);
    return (
        <StyledNavbar>
            <NavLinks>
                <Link to='/'>
                    <NavLink>Home</NavLink>
                </Link>
                {isAuthenticated ? (
                    <>
                        <NavItem>Welcome, {user.username}</NavItem>
                        <NavLink onClick={() => dispatch(logout())}>
                            Logout
                        </NavLink>
                    </>
                ) : (
                    <>
                        <Link to='/auth/signin'>
                            <NavLink>Sign in</NavLink>
                        </Link>

                        <Link to='/auth/signup'>
                            <NavLink>Sign up</NavLink>
                        </Link>
                    </>
                )}
            </NavLinks>
        </StyledNavbar>
    );
}
