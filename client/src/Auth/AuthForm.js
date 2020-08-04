import React, { useState } from "react";

import { Form, FormTitle, InputGroup, Input } from "shared/components/Form";
import { PrimaryButton } from "shared/components/Button";

import { connect } from "react-redux";
import { authUser } from "store/actions/auth";

function AuthForm({ authMethod, authTitle, authUser }) {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });

    function handleInputChange(e) {
        const { target } = e;
        setUserData((prevData) => ({
            ...prevData,
            [target.name]: target.value,
        }));
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        authUser(authMethod, userData);
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

export default connect(null, { authUser })(AuthForm);
