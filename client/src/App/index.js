import React from "react";
import Routes from "./Routes";
import BaseStyles from "./Styles/BaseStyles";
import StoreProvider from "store/";

import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
    timeout: 5000,
    position: positions.TOP_CENTER,
};

export default function App() {
    return (
        <StoreProvider>
            <AlertProvider template={AlertTemplate} {...options}>
                <BaseStyles />
                <Routes />
            </AlertProvider>
        </StoreProvider>
    );
}
