import React, { useEffect, useState } from "react";
import Chatbox from "../Chatbox";
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
        if (!chatroom || !user) {
            history.push("/chatrooms");
        }
    }, [history, chatroom, user]);

    useEffect(() => {
        if (user) {
            socket.emit("joinRoom", match.params.id, user);
        }
        // Listen to when a new message is sent
        socket.on("receiveMessage", (message) => {
            setMessages((messages) => [...messages, message]);
        });

        socket.on("userJoinedRoom", (newUsersList) => {
            setUsers(newUsersList);
        });

        socket.on("userLeftRoom", (newUsersList) => {
            setUsers(newUsersList);
        });

        socket.on("deleteMessage", (messageId) => {
            setMessages((messages) =>
                messages.filter((msg) => msg._id !== messageId)
            );
        });

        socket.on("clearedChat", () => {
            setMessages([]);
        });

        socket.on("notification", (notification) => {
            setMessages((messages) => [...messages, notification]);
        });

        return () => {
            if (user) {
                socket.emit("leaveRoom", match.params.id, user);
            }
        };
        // eslint-disable-next-line
    }, [match.params.id]);

    useEffect(() => {
        if (!messages) {
            fetchChatroomMessages(match.params.id, setMessages);
        }
    }, [messages, setMessages, match.params.id]);

    function addMessage(message) {
        socket.emit(
            "attemptSendMessage",
            match.params.id,
            message,
            user.username,
            user.id
        );
    }

    function deleteMessage(messageId) {
        socket.emit("attemptDeleteMessage", match.params.id, messageId);
    }

    if (!messages) {
        return <h2>Loading...</h2>;
    }

    const chatboxProps = {
        user,
        messages,
        addMessage,
        deleteMessage,
    };

    return (
        <div>
            <p>Current users: {users.length}</p>
            <WarningButton
                onClick={() =>
                    socket.emit("attemptClearChat", match.params.id, user.id)
                }
            >
                Clear chat
            </WarningButton>
            <Chatbox {...chatboxProps} />
        </div>
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
    const { chatrooms: chatroomsArr } = chatrooms;
    if (chatroomsArr.length < 1) {
        return { chatroom: false };
    }
    return {
        user: currentUser.user,
        chatroom: chatroomsArr.filter((chatroom) => chatroom._id === id)[0],
    };
};

export default connect(mapStateToProps, null)(Chatroom);
