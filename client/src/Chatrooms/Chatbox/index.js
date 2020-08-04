import React, { useState, useEffect, useRef } from "react";
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
    const chatboxRef = useRef(null);

    useEffect(() => {
        chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
    }, [messages]);

    function handleSubmit(e) {
        e.preventDefault();
        const trimmedMsg = message.trim();
        if (trimmedMsg === "") return;
        setMessage("");
        addMessage(trimmedMsg);
    }

    return (
        <ChatboxContainer>
            <ChatboxMessages ref={chatboxRef}>
                {messages.length > 0 &&
                    renderMessages(messages, deleteMessage, user)}
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

function renderMessages(messages, deleteMessage, user) {
    return messages.map((message) => (
        <Message key={message._id} isMyMessage={message.user_id === user.id}>
            <Message.Text>{message.text}</Message.Text>
            <Message.Author>{message.username}</Message.Author>
            {message.user_id === user.id && (
                <button onClick={() => deleteMessage(message._id)}>x</button>
            )}
        </Message>
    ));
}

export default Chatbox;
