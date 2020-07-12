import React from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Navbar from "./Navbar";

export default function Routes() {
    return (
        <BrowserRouter>
            <Navbar />
            <Switch>
                <Route exact path='/' component={() => <h1>Home route</h1>} />
                <Route
                    exact
                    path='/signin'
                    component={() => <h1>Sign in</h1>}
                />
                <Route
                    exact
                    path='/signup'
                    component={() => <h1>Sign up</h1>}
                />
            </Switch>
        </BrowserRouter>
    );
}
