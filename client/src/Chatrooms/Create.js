import React, { useState } from "react";
import { Form, FormTitle, InputGroup, Input } from "shared/components/Form";
import { PrimaryButton } from "shared/components/Button";
import Page from "shared/components/Page";

import { connect } from "react-redux";
import { createChatroom } from "store/actions/chatrooms";

function CreateChatroomForm({ createChatroom }) {
    const [chatroomName, setChatroomName] = useState("");

    function handleOnSubmit(e) {
        e.preventDefault();
        createChatroom(chatroomName);
    }

    return (
        <Page>
            <Form onSubmit={handleOnSubmit}>
                <FormTitle>Create a Chatroom</FormTitle>
                <InputGroup>
                    <Input
                        type='text'
                        name='chatroom-name'
                        placeholder='Enter chatroom name'
                        onChange={(e) => setChatroomName(e.target.value)}
                        value={chatroomName}
                    />
                </InputGroup>
                <PrimaryButton>Create</PrimaryButton>
            </Form>
        </Page>
    );
}

export default connect(null, { createChatroom })(CreateChatroomForm);
