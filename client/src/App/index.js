import React from "react";
import Routes from "./Routes";
import BaseStyles from "./Styles/BaseStyles";
import ProvidersWrapper from "./Providers";

export default function App() {
    return (
        <ProvidersWrapper>
            <BaseStyles />
            <Routes />
        </ProvidersWrapper>
    );
}
