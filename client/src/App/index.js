import React from "react";
import Routes from "./Routes";
import BaseStyles from "./Styles/BaseStyles";

import { Provider } from "react-redux";
import configureStore from "store/";
import { setCurrentUser } from "store/actions/auth";
import jwtDecode from "jwt-decode";

import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const store = configureStore();

const options = {
    timeout: 5000,
    position: positions.TOP_CENTER,
};

if (localStorage.jwtToken) {
    try {
        store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
    } catch (err) {
        store.dispatch(setCurrentUser({}));
    }
}

export default function App() {
    return (
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...options}>
                <BaseStyles />
                <Routes />
            </AlertProvider>
        </Provider>
    );
}
