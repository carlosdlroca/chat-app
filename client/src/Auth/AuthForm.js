import React, { useState, useContext } from "react";
import {
    Form,
    FormTitle,
    InputGroup,
    InputLabel,
    Input,
} from "shared/components/Form";
import { PrimaryButton } from "shared/components/Button";
import { authUser } from "store/actions/auth";
import { StoreContext } from "store/";

export default function AuthForm({ authAction, authTitle }) {
    const [state, dispatch] = useContext(StoreContext);
    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });

    function handleInputChange(e) {
        e.persist();
        setUserData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        const setUserAction = await authUser(authAction, userData);
        dispatch(setUserAction);
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <FormTitle>{authTitle}</FormTitle>
            <InputGroup>
                <InputLabel>Username</InputLabel>
                <Input
                    type='text'
                    value={userData.username}
                    name='username'
                    onChange={handleInputChange}
                    placeholder={"Enter Your username"}
                />
            </InputGroup>
            <InputGroup>
                <InputLabel>Password</InputLabel>
                <Input
                    type='text'
                    value={userData.password}
                    name='password'
                    onChange={handleInputChange}
                    placeholder={"Enter your password"}
                />
            </InputGroup>
            <PrimaryButton>{authTitle}</PrimaryButton>
        </Form>
    );
}
