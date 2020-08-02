import {
    GET_CHATROOMS,
    CREATE_CHATROOM,
    DELETE_CHATROOM,
    SET_LOADING_STATE,
} from "../actionTypes";
import { addError, removeError } from "./errors";
import api from "shared/utils/api";
import history from "shared/history";

export function getChatrooms() {
    return async (dispatch) => {
        try {
            dispatch(setIsLoadingState(true));
            const chatrooms = await api("GET", "/api/chatrooms");
            console.log({ message: "Got chatrooms", chatrooms });
            dispatch({ type: GET_CHATROOMS, chatrooms });
            dispatch(removeError());
        } catch (err) {
            dispatch(addError("There was a problem fetching all chatrooms"));
        } finally {
            dispatch(setIsLoadingState(false));
        }
    };
}

export function createChatroom(chatroom_name) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoadingState(true));
            const { chatroom } = await api("POST", "/api/chatrooms", {
                name: chatroom_name,
            });
            dispatch({ type: CREATE_CHATROOM, chatroom });
            dispatch(removeError());
            history.push(`/chatrooms/${chatroom._id}`);
        } catch (err) {
            dispatch(
                addError("There was a problem creating a chatroom. Try Again!")
            );
        } finally {
            dispatch(setIsLoadingState(false));
        }
    };
}

export function deleteChatroom(chatroomID) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoadingState(true));
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
        } finally {
            dispatch(setIsLoadingState(false));
        }
    };
}

function setIsLoadingState(isLoading) {
    return { type: SET_LOADING_STATE, isLoading };
}
