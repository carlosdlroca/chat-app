import React from "react";
import AuthenticatedNav from "./Authenticated";
import UnauthenticatedNav from "./Unathenticated";

import { logout } from "store/actions/auth";
import { connect } from "react-redux";

function Navbar({ currentUser, logout }) {
    const { isAuthenticated, user } = currentUser;
    return isAuthenticated ? (
        <AuthenticatedNav logout={logout} {...user} />
    ) : (
        <UnauthenticatedNav />
    );
}

const mapStateToProps = ({ currentUser }) => ({
    currentUser,
});

export default connect(mapStateToProps, { logout })(Navbar);
