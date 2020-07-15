import React from "react";
import Routes from "./Routes";
import BaseStyles from "./Styles/BaseStyles";
import StoreProvider from "store/";

export default function App() {
    return (
        <StoreProvider>
            <BaseStyles />
            <Routes />
        </StoreProvider>
    );
}
