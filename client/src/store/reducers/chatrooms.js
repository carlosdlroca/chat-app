import {
    GET_CHATROOMS,
    CREATE_CHATROOM,
    DELETE_CHATROOM,
    SET_LOADING_STATE,
} from "../actionTypes";

const initialState = {
    chatrooms: [],
    isLoading: false,
};

export default function chatroomReducer(state = initialState, action) {
    switch (action.type) {
        case GET_CHATROOMS:
            const { chatrooms } = action.chatrooms;
            return {
                ...state,
                chatrooms: [...state.chatrooms, ...chatrooms],
            };
        case CREATE_CHATROOM:
            return {
                ...state,
                chatrooms: [...state.chatrooms, action.chatroom],
            };
        case DELETE_CHATROOM:
            return {
                ...state,
                chatrooms: state.chatrooms.filter(
                    (chatroom) => chatroom._id !== action.chatroom_id
                ),
            };
        case SET_LOADING_STATE:
            return {
                ...state,
                isLoading: action.isLoading,
            };
        default:
            return state;
    }
}
