import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
    Form,
    FormTitle,
    InputGroup,
    Input,
    ErrMessage,
} from "shared/components/Form";
import { PrimaryButton } from "shared/components/Button";
import { authUser } from "store/actions/auth";
import { StoreContext } from "store/";
import { useAlert } from "react-alert";

export default function AuthForm({ authAction, authTitle }) {
    const [state, dispatch] = useContext(StoreContext);
    const [userData, setUserData] = useState({
        username: "",
        password: "",
    });
    const history = useHistory();
    const alert = useAlert();

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
        if (setUserAction.errMessage) {
            alert.error(setUserAction.errMessage);
            setUserData({ username: "", password: "" });
            document.activeElement.blur();
            return;
        }
        history.push("/");
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
