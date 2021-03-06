import React, { useState } from "react";
import { Form, FormTitle, InputGroup, Input } from "shared/components/Form";
import { PrimaryButton } from "shared/components/Button";
import Page from "shared/components/Page";

import { connect } from "react-redux";
import { createChatroom } from "store/actions/chatrooms";
import withError from "shared/hocs/withError";

function CreateChatroomForm({ createChatroom }) {
    const [chatroomName, setChatroomName] = useState("");

    function handleOnSubmit(e) {
        e.preventDefault();
        createChatroom(chatroomName);
    }

    return (
        <div>
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
        </div>
    );
}

const ConnectedComponent = connect(null, { createChatroom })(
    CreateChatroomForm
);
export default withError(ConnectedComponent);
