import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getChatrooms } from "store/actions/chatrooms";

import { PrimaryButton, SecondaryButton } from "shared/components/Button/";
import Centered from "shared/components/Layout/Centered";

function Chatrooms({ chatrooms, getChatrooms }) {
    useEffect(() => {
        if (chatrooms.length < 1) {
            getChatrooms();
        }
    }, [chatrooms, getChatrooms]);
    if (chatrooms.length === 0) {
        return <h1>Loading...</h1>;
    }

    return (
        <div>
            <Centered>
                <Link to='/chatrooms/create'>
                    <PrimaryButton>Create a chatroom</PrimaryButton>
                </Link>
            </Centered>
            {chatrooms.map((chatroom) => (
                <div key={chatroom._id}>
                    <h2>{chatroom.name}</h2>
                    <Link to={`/chatrooms/${chatroom._id}`}>
                        <SecondaryButton>Join</SecondaryButton>
                    </Link>
                </div>
            ))}
        </div>
    );
}

const mapStateToProps = ({ chatrooms, error }) => ({ chatrooms, error });
export default connect(mapStateToProps, { getChatrooms })(Chatrooms);
