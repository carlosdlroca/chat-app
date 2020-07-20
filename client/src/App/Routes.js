import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Navbar from "App/Navbar";
import AuthPage from "Auth/AuthPage";
import history from "shared/history";

export default function Routes() {
    return (
        <Router history={history}>
            <Navbar />
            <Switch>
                <Route exact path='/' component={() => <h1>Home route</h1>} />
                <Route
                    path='/auth/signin'
                    component={() => (
                        <AuthPage authMethod={"signin"} authTitle={"Sign in"} />
                    )}
                />
                <Route
                    path='/auth/signup'
                    component={() => (
                        <AuthPage authMethod={"signup"} authTitle={"Sign up"} />
                    )}
                />
            </Switch>
        </Router>
    );
}
