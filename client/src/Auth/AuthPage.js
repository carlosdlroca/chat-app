import React from "react";
import AuthForm from "./AuthForm";
import { StyledAuthPage } from "./Styles";

export default function AuthPage({ authMethod, authTitle }) {
    return (
        <StyledAuthPage>
            <AuthForm authMethod={authMethod} authTitle={authTitle} />
        </StyledAuthPage>
    );
}
