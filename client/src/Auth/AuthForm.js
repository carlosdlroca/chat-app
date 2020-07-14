import React, { useState } from "react";
import {
    Form,
    FormTitle,
    InputGroup,
    InputLabel,
    Input,
} from "shared/components/Form";
import { PrimaryButton } from "shared/components/Button";
import api from "shared/utils/api";

export default function AuthForm({ authAction, authTitle }) {
    const [inputValues, setInputValues] = useState({
        username: "",
        password: "",
    });

    function handleInputChange(e) {
        e.persist();
        setInputValues((prevValues) => ({
            ...prevValues,
            [e.target.name]: e.target.value,
        }));
    }

    async function handleFormSubmit(e) {
        e.preventDefault();
        const token = await api("POST", `/api/auth/${authAction}`, inputValues);
        console.log(token);
    }

    return (
        <Form onSubmit={handleFormSubmit}>
            <FormTitle>{authTitle}</FormTitle>
            <InputGroup>
                <InputLabel>Username</InputLabel>
                <Input
                    type='text'
                    value={inputValues.username}
                    name='username'
                    onChange={handleInputChange}
                    placeholder={"Enter Your username"}
                />
            </InputGroup>
            <InputGroup>
                <InputLabel>Password</InputLabel>
                <Input
                    type='text'
                    value={inputValues.password}
                    name='password'
                    onChange={handleInputChange}
                    placeholder={"Enter your password"}
                />
            </InputGroup>
            <PrimaryButton>{authTitle}</PrimaryButton>
        </Form>
    );
}
