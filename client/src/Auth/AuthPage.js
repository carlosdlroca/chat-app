import React from "react";
import AuthForm from "./AuthForm";
import Page from "shared/components/Page";
import withError from "shared/hocs/withError";

function AuthPage({ authMethod, authTitle }) {
    return (
        <Page>
            <AuthForm authMethod={authMethod} authTitle={authTitle} />
        </Page>
    );
}

export default withError(AuthPage);
