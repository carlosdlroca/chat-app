import React, { useEffect, useState } from "react";
import Chatbox from "../Chatbox";
import Page from "shared/components/Page";
import { WarningButton } from "shared/components/Button";

import socket from "shared/utils/socket";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import api from "shared/utils/api";

function Chatroom({ user, chatroom, match }) {
    const [messages, setMessages] = useState(null);
    const [users, setUsers] = useState([]);

    const history = useHistory();
    useEffect(() => {
        if (!chatroom) {
            history.push("/");
        }
    }, [history, chatroom]);

    useEffect(() => {
        socket.emit("joinRoom", match.params.id, user);
        // Listen to when a new message is sent
        socket.on("message", (message) => {
            setMessages((messages) => [...messages, message]);
        });

        socket.on("userJoinedRoom", (newUser) => {
            setUsers((usersList) => [...usersList, newUser]);
        });

        socket.on("userLeftRoom", (departingUser) => {
            if (users.length === 0) return;
            setUsers((usersList) =>
                usersList.filter((u) => u.id === departingUser.id)
            );
        });

        socket.on("clearedChat", () => {
            setMessages([]);
        });

        return () => {
            socket.emit("leaveRoom", match.params.id, user);
        };
    }, [match.params.id]);

    useEffect(() => {
        if (!messages) {
            fetchChatroomMessages(match.params.id, setMessages);
        }
    }, [messages, setMessages, match.params.id]);

    function addMessage(message) {
        socket.emit(
            "sendMessage",
            match.params.id,
            message,
            user.username,
            user.id
        );
    }

    if (!messages) {
        return <h2>Loading...</h2>;
    }

    return (
        <Page>
            <p>Current users: {users.length}</p>
            <WarningButton
                onClick={() =>
                    socket.emit("clearChat", match.params.id, user.id)
                }
            >
                Clear chat
            </WarningButton>
            <Chatbox messages={messages} addMessage={addMessage} />
        </Page>
    );
}

async function fetchChatroomMessages(chatroom_id, callback) {
    try {
        const { messages } = await api(
            "GET",
            `/api/chatrooms/${chatroom_id}/messages`
        );
        callback(messages);
    } catch (err) {
        console.log({ err });
    }
}

const mapStateToProps = ({ chatrooms, currentUser }, ownProps) => {
    const { id } = ownProps.match.params;
    if (chatrooms.length < 1) {
        return { chatroom: false };
    }
    return {
        user: currentUser.user,
        chatroom: chatrooms.filter((chatroom) => chatroom._id === id)[0],
    };
};

export default connect(mapStateToProps, null)(Chatroom);
