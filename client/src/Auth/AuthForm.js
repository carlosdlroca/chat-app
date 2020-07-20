import React, { useState, useEffect } from "react";

import { Form, FormTitle, InputGroup, Input } from "shared/components/Form";
import { PrimaryButton } from "shared/components/Button";
import { useAlert } from "react-alert";

import { connect } from "react-redux";
import { authUser } from "store/actions/auth";
import { addError } from "store/actions/errors";

function AuthForm({ authMethod, authTitle, authUser, addError, error }) {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });
    const alert = useAlert();

    useEffect(() => {
        if (error && error.message) {
            alert.error(error.message);
        }
    }, [error]);

    function handleInputChange(e) {
        const { target } = e;
        setUserData((prevData) => ({
            ...prevData,
            [target.name]: target.value,
        }));
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        try {
            await authUser(authMethod, userData);
            setUserData({ username: "", password: "" });
            document.activeElement.blur();
        } catch (err) {
            setUserData({ username: "", password: "" });
            document.activeElement.blur();
            return;
        }
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <FormTitle>{authTitle}</FormTitle>
            <InputGroup>
                <Input
                    type='text'
                    value={userData.username}
                    name='username'
                    onChange={handleInputChange}
                    placeholder={"Username"}
                    required
                />
            </InputGroup>
            <InputGroup>
                <Input
                    type='password'
                    value={userData.password}
                    name='password'
                    onChange={handleInputChange}
                    placeholder={"Password"}
                    required
                />
            </InputGroup>
            <PrimaryButton>{authTitle}</PrimaryButton>
        </Form>
    );
}

const mapStateToProps = ({ error }) => ({ error });

export default connect(mapStateToProps, { authUser, addError })(AuthForm);
