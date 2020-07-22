import {
    GET_CHATROOMS,
    CREATE_CHATROOM,
    DELETE_CHATROOM,
} from "../actionTypes";
import { addError, removeError } from "./errors";
import api from "shared/utils/api";
import history from "shared/history";

export function getChatrooms() {
    return async (dispatch) => {
        try {
            const chatrooms = await api("GET", "/api/chatrooms");
            dispatch({ type: GET_CHATROOMS, chatrooms: chatrooms });
            dispatch(removeError());
        } catch (err) {
            dispatch(addError("There was a problem fetching all chatrooms"));
        }
    };
}

export function createChatroom(chatroom_name) {
    return async (dispatch) => {
        try {
            const chatroom = await api("POST", "/api/chatrooms", {
                name: chatroom_name,
            });
            dispatch({ type: CREATE_CHATROOM, chatroom });
            dispatch(removeError());
            history.push(`/chatrooms/${chatroom.id}`);
        } catch (err) {
            dispatch(
                addError("There was a problem creating a chatroom. Try Again!")
            );
        }
    };
}

export function deleteChatroom(chatroomID) {
    return async (dispatch) => {
        try {
            const chatroom_id = await api(
                "DELETE",
                `/api/chatrooms/${chatroomID}`
            );
            dispatch({ type: DELETE_CHATROOM, chatroom_id });
            dispatch(removeError());
            history.push("/");
        } catch (err) {
            dispatch(
                addError(
                    "There was an error deleting your chatroom. Please Try Again!"
                )
            );
        }
    };
}
