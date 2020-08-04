import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getChatrooms, deleteChatroom } from "store/actions/chatrooms";

import { ChatroomsList, ChatroomItem } from "./Styles";
import {
    PrimaryButton,
    SecondaryButton,
    WarningButton,
} from "shared/components/Button/";
import Centered from "shared/components/Layout/Centered";

import withError from "shared/hocs/withError";

function Chatrooms({
    user,
    chatrooms,
    getChatrooms,
    deleteChatroom,
    isLoading,
}) {
    useEffect(() => {
        if (!isLoading && chatrooms.length < 1) {
            getChatrooms();
        }
        //eslint-disable-next-line
    }, [chatrooms, isLoading]);

    if (isLoading && chatrooms.length === 0) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <Centered>
                <Link to='/chatrooms/create'>
                    <PrimaryButton>Create a chatroom</PrimaryButton>
                </Link>
            </Centered>
            <ChatroomsList>
                {chatrooms.length > 0 &&
                    renderChatrooms(user, chatrooms, deleteChatroom)}
            </ChatroomsList>
        </div>
    );
}

function renderChatrooms(user, chatrooms, deleteChatroom) {
    return chatrooms.map((chatroom) => (
        <ChatroomItem key={chatroom._id}>
            <ChatroomItem.Info>
                <span>
                    Charoom name:{" "}
                    <ChatroomItem.Name>{chatroom.name}</ChatroomItem.Name>
                </span>
            </ChatroomItem.Info>
            <ChatroomItem.Options>
                <Link to={`/chatrooms/${chatroom._id}`}>
                    <SecondaryButton>Join</SecondaryButton>
                </Link>
                {user.id === chatroom.owner && (
                    <WarningButton onClick={() => deleteChatroom(chatroom._id)}>
                        Delete
                    </WarningButton>
                )}
            </ChatroomItem.Options>
        </ChatroomItem>
    ));
}

const mapStateToProps = ({ currentUser, chatrooms }) => {
    const { chatrooms: chatroomsArr, isLoading } = chatrooms;
    const { user } = currentUser;
    return {
        chatrooms: chatroomsArr,
        isLoading,
        user,
    };
};

const ConnectedChatrooms = connect(mapStateToProps, {
    getChatrooms,
    deleteChatroom,
})(Chatrooms);

export default withError(ConnectedChatrooms);
