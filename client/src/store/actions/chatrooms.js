import {
    GET_CHATROOM,
    GET_CHATROOMS,
    CREATE_CHATROOM,
    DELETE_CHATROOM,
    SET_LOADING_STATE,
} from "../actionTypes";
import { addError } from "./errors";
import api from "shared/utils/api";
import history from "shared/history";

export function getChatrooms() {
    return async (dispatch) => {
        try {
            dispatch(setIsLoadingState(true));
            const { chatrooms, error } = await api("GET", "/api/chatrooms");
            if (error) {
                return dispatch(addError(error.message));
            }
            dispatch({ type: GET_CHATROOMS, chatrooms });
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
            const { chatroom, error } = await api("POST", "/api/chatrooms", {
                name: chatroom_name,
            });
            if (error) {
                return dispatch(addError(error.message));
            }
            dispatch({ type: CREATE_CHATROOM, chatroom });
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
            const { chatroom_id, error } = await api(
                "DELETE",
                `/api/chatrooms/${chatroomID}`
            );
            if (error) {
                return dispatch(addError(error.message));
            }
            dispatch({ type: DELETE_CHATROOM, chatroom_id });
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

export function getChatroomWithId(chatroomID) {
    return async (dispatch) => {
        try {
            dispatch(setIsLoadingState(true));
            const { chatroom, error } = await api(
                "GET",
                `/api/chatrooms/${chatroomID}`
            );

            if (error) {
                return dispatch(addError(error.message));
            }
            dispatch({ type: GET_CHATROOM, chatroom });
        } catch (err) {
            dispatch(addError("Could not find that chatroom, sorry"));
        } finally {
            dispatch(setIsLoadingState(false));
        }
    };
}

function setIsLoadingState(isLoading) {
    return { type: SET_LOADING_STATE, isLoading };
}
