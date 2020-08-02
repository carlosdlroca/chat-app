import React, { useState } from "react";
import {
    ChatboxContainer,
    ChatboxForm,
    ChatboxMessages,
    ChatboxInput,
} from "./Styles";
import Message from "./Message";
import { PrimaryButton } from "shared/components/Button";

function Chatbox({ user, messages, addMessage, deleteMessage }) {
    const [message, setMessage] = useState("");
    function handleSubmit(e) {
        e.preventDefault();
        addMessage(message);
        setMessage("");
    }

    function renderMessages(messages) {
        return messages.map((message) => (
            <Message
                key={message._id}
                isMyMessage={message.user_id === user.id}
            >
                <Message.Text>{message.text}</Message.Text>
                <Message.Author>{message.username}</Message.Author>
                {message.user_id === user.id && (
                    <button onClick={() => deleteMessage(message._id)}>
                        x
                    </button>
                )}
            </Message>
        ));
    }

    return (
        <ChatboxContainer>
            <ChatboxMessages>
                {messages.length > 0 && renderMessages(messages)}
            </ChatboxMessages>
            <ChatboxForm onSubmit={handleSubmit}>
                <ChatboxInput
                    type='text'
                    placeholder='Send a message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <PrimaryButton>Send</PrimaryButton>
            </ChatboxForm>
        </ChatboxContainer>
    );
}

export default Chatbox;
