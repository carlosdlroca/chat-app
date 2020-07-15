import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "App/Navbar";
import AuthPage from "Auth/AuthPage";

export default function Routes() {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path='/' component={() => <h1>Home route</h1>} />
                <Route
                    path='/auth/signin'
                    component={() => (
                        <AuthPage authAction={"signin"} authTitle={"Sign In"} />
                    )}
                />
                <Route
                    path='/auth/signup'
                    component={() => (
                        <AuthPage authAction={"signup"} authTitle={"Sign UP"} />
                    )}
                />
            </Switch>
        </BrowserRouter>
    );
}
