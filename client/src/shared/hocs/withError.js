import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { connect } from "react-redux";
import { removeError } from "store/actions/errors";

export default function withError(Component) {
    function WrappedComponent({ error, removeError, ...props }) {
        const alert = useAlert();
        useEffect(() => {
            if (error && error.message) {
                alert.error(error.message);
                removeError();
            }
        }, [error, removeError, error.message, alert]);
        return <Component {...props} />;
    }

    const mapStateToProps = ({ error }) => ({ error });
    return connect(mapStateToProps, { removeError })(WrappedComponent);
}
