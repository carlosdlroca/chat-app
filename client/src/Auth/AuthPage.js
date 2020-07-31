import React from "react";
import AuthForm from "./AuthForm";
import Page from "shared/components/Page";

export default function AuthPage({ authMethod, authTitle }) {
    return (
        <Page>
            <AuthForm authMethod={authMethod} authTitle={authTitle} />
        </Page>
    );
}
