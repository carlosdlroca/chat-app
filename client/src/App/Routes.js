import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Navbar from "App/Navbar";
import AuthPage from "Auth/AuthPage";
import Chatrooms from "Chatrooms";
import Chatroom from "Chatrooms/Chatroom";
import CreateChatroom from "Chatrooms/Create";
import history from "shared/history";
import Page from "shared/components/Page";

export default function Routes() {
    return (
        <Router history={history}>
            <Page>
                <Navbar />
                <Switch>
                    <Route
                        exact
                        path='/'
                        component={() => <h1>Home route</h1>}
                    />
                    <Route
                        path='/auth/signin'
                        component={() => (
                            <AuthPage
                                authMethod={"signin"}
                                authTitle={"Sign in"}
                            />
                        )}
                    />
                    <Route
                        path='/auth/signup'
                        component={() => (
                            <AuthPage
                                authMethod={"signup"}
                                authTitle={"Sign up"}
                            />
                        )}
                    />
                    <Route
                        exact
                        path='/chatrooms'
                        component={() => <Chatrooms />}
                    />
                    <Route
                        exact
                        path='/chatrooms/create'
                        component={() => <CreateChatroom />}
                    />
                    <Route path='/chatrooms/:id' component={Chatroom} />
                </Switch>
            </Page>
        </Router>
    );
}
