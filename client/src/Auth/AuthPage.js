import React from "react";
import AuthForm from "./AuthForm";
import withError from "shared/hocs/withError";

function AuthPage({ authMethod, authTitle }) {
    return (
        <div>
            <AuthForm authMethod={authMethod} authTitle={authTitle} />
        </div>
    );
}

export default withError(AuthPage);
