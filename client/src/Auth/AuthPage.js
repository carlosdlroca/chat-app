import React from "react";
import AuthForm from "./AuthForm";
import { StyledAuthPage } from "./Styles";

export default function AuthPage({ authAction, authTitle }) {
    return (
        <StyledAuthPage>
            <AuthForm authAction={authAction} authTitle={authTitle} />
        </StyledAuthPage>
    );
}
