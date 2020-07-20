import React from "react";
import { Link } from "react-router-dom";
import { StyledNavbar, NavLinks, NavLink, NavItem } from "./Styles";
import { useAlert } from "react-alert";

import { logout } from "store/actions/auth";
import { connect } from "react-redux";

function Navbar({ currentUser, logout }) {
    const alert = useAlert();
    const { isAuthenticated, user } = currentUser;
    return (
        <StyledNavbar>
            <NavLinks>
                <Link to='/'>
                    <NavLink>Home</NavLink>
                </Link>
                {isAuthenticated ? (
                    <>
                        <NavItem>Welcome, {user.username}</NavItem>
                        <NavLink
                            onClick={() => {
                                logout();
                                alert.success("Successfully logged out");
                            }}
                        >
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

const mapStateToProps = ({ currentUser }) => ({
    currentUser,
});

export default connect(mapStateToProps, { logout })(Navbar);
